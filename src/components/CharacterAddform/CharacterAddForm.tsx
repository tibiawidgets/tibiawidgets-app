import * as React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { getWorlds, addCharacter } from '../../services/tibia-widgets-api';
import 'flag-icons/css/flag-icons.min.css';
import { Character } from '../../types/types';
import { useUserContext } from '../../contexts/UserContext';

export interface IChraracterAddFormProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  mode: 'new' | 'edit';
  editCharacter?: Character;
}
type WorldLocationType = 'Europe' | 'South America' | 'North America';

const initialValues = {
  genders: ['Male', 'Female'],
  vocations: ['Knight', 'Paladin', 'Druid', 'Sorcerer']
};

export default function CharacterAddForm({ visible, title, onClose, mode, editCharacter }: IChraracterAddFormProps) {
  const [worlds, setWorlds] = useState([]);
  const { modifyCharacter, fetchCharacters } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: editCharacter?.name || '',
      world: editCharacter?.world || '',
      vocation: editCharacter?.vocation || '',
      gender: editCharacter?.gender || ''
    },
    validate: (data) => {
      const errors = {};

      if (!data.name) {
        errors.name = 'Character name is required.';
      }
      if (!data.world) {
        errors.world = 'World is required.';
      }
      if (!data.vocation) {
        errors.vocation = 'Vocation is required.';
      }
      if (!data.gender) {
        errors.gender = 'Gender is required.';
      }

      return errors;
    },
    onSubmit: async (data) => {
      if (mode === 'new') {
        await addCharacter(data as Character).then(() => {
          fetchCharacters();
        });
      }
      if (mode === 'edit' && editCharacter) {
        modifyCharacter(editCharacter.id, data as Character).then(() => {
          fetchCharacters();
        });
      }
      onClose();
      formik.resetForm();
      setIsLoading(false);
    }
  });

  React.useEffect(() => {
    if (editCharacter) {
      formik.setFieldValue('name', editCharacter.name);
      formik.setFieldValue('gender', editCharacter.gender);
      formik.setFieldValue('vocation', editCharacter.vocation);
      formik.setFieldValue('world', editCharacter.world);
    }
  }, [editCharacter]);

  React.useEffect(() => {
    getWorlds().then((_worlds) => {
      setWorlds(_worlds.regular_worlds);
    });
  }, []);

  const isFormFieldInvalid = (name: string) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  const getServerZoneCode = (location: WorldLocationType) => {
    switch (location) {
      case 'Europe':
        return 'eu';
      case 'North America':
        return 'us';
      case 'South America':
      default:
        return 'br';
    }
  };

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      const flagCode = getServerZoneCode(option.location);
      return (
        <div className="flex align-items-center">
          <img
            alt={option.name}
            src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
            className={`mr-2 fi fi-${flagCode}`}
            style={{ width: '18px' }}
          />
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const countryOptionTemplate = (option) => {
    const flagCode = getServerZoneCode(option.location);
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`mr-2 fi fi-${flagCode}`}
          style={{ width: '18px' }}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <Dialog className="w-1/2" visible={visible} header={title} onHide={onClose}>
      <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
        <InputText
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Character name"
        />
        {getFormErrorMessage('name')}
        <Dropdown
          filter
          id="world"
          name="world"
          value={formik.values.world}
          onChange={formik.handleChange}
          options={worlds}
          placeholder="Select world"
          optionLabel="name"
          optionValue="name"
          valueTemplate={selectedCountryTemplate}
          itemTemplate={countryOptionTemplate}
        />
        {getFormErrorMessage('world')}
        <Dropdown
          id="gender"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          options={initialValues.genders}
          placeholder="Character Gender"
        />
        {getFormErrorMessage('gender')}
        <Dropdown
          id="vocation"
          name="vocation"
          value={formik.values.vocation}
          onChange={formik.handleChange}
          options={initialValues.vocations}
          placeholder="Character Vocation"
        />
        {getFormErrorMessage('vocation')}
        <Button
          type="submit"
          className="block self-end"
          icon="pi pi-user"
          label={editCharacter ? 'Update Character' : 'Add Character'}
          loading={isLoading}
        />
      </form>
    </Dialog>
  );
}
