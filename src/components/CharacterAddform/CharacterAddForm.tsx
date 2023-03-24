import * as React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { getWorlds } from '../../services/tibia-widgets-api';

export interface IChraracterAddFormProps {
  visible: boolean;
  title: string;
  onClose: () => void;
}

const initialValues = {
  worlds: [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
  ],
  genders: ['Male', 'Female'],
  vocations: ['Knight', 'Paladin', 'Druid', 'Sorcerer']
};

export default function CharacterAddForm({ visible, title, onClose }: IChraracterAddFormProps) {
  const [worlds, setWorlds] = useState(initialValues.worlds);
  const formik = useFormik({
    initialValues: {
      charname: '',
      world: '',
      vocation: '',
      gender: ''
    },
    validate: (data) => {
      const errors = {};

      if (!data.charname) {
        errors.charname = 'Character name is required.';
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
    onSubmit: (data) => {
      formik.resetForm();
    }
  });

  React.useEffect(() => {
    getWorlds().then((_worlds) => {
      setWorlds(_worlds.regular_worlds);
    });
  }, []);

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <Dialog className="w-1/2" visible={visible} header={title} onHide={onClose}>
      <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
        <InputText
          id="charname"
          name="charname"
          value={formik.values.charname}
          onChange={formik.handleChange}
          placeholder="Character name"
        />
        {getFormErrorMessage('charname')}
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
        <Button type="submit" className="w-40 self-end" icon="pi pi-user" label="Add Character" />
      </form>
    </Dialog>
  );
}
