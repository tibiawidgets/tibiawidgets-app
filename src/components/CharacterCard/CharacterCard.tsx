import { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import * as React from 'react';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';
import DruidImage from '../../assets/icons/druid-male.png';
import DruidFemaleImage from '../../assets/icons/druid-female.png';
import KnightImage from '../../assets/icons/knight-male.png';
import Outfits from './outfits';
import KnightFemaleImage from '../../assets/icons/knight-female.png';
import SorcererImage from '../../assets/icons/sorcerer-male.png';
import SorcererFemaleImage from '../../assets/icons/sorcerer-female.png';
import PaladinImage from '../../assets/icons/paladin-male.png';
import PaladinFemaleImage from '../../assets/icons/paladin-female.png';
import { Character } from '../../types/types';
import { useUserContext } from '../../contexts/UserContext';

interface ICharacterCardProps {
  character: Character;
  onEdit: (char: Character) => void;
}

function CharacterCard({ character: char, onEdit }: ICharacterCardProps) {
  const menu = useRef<Menu>(null);
  const { fetchCharacters, removeCharacter } = useUserContext();
  const contextMenuItems: MenuItem[] = [
    {
      id: char.id,
      label: 'Edit',
      icon: 'pi pi-user-edit',
      command: () => {
        onEdit(char);
      }
    },
    {
      id: char.id,
      label: 'Remove',
      icon: 'pi pi-trash',
      command: (ev: MenuItemCommandEvent) => {
        removeCharacter(ev.item.id).then(() => fetchCharacters());
      }
    }
  ];

  const getVocationImage = (vocation: string, gender = 'Male') => {
    const entryName = vocation.toLocaleLowerCase() + gender;
    return Outfits[entryName];
  };
  return (
    <div className="flex flex-col justify-between shadow-2 p-4 mb-5 lg:mb-0 mr-0 lg:mr-5 surface-card w-60 h-60 hover:surface-0 relative">
      <img
        className="self-center"
        width="120px"
        height="120px"
        alt={char.name}
        src={getVocationImage(char.vocation, char.gender)}
      />
      <div>
        <div className="text-xl text-900 font-medium mb-2">{char.name}</div>
        <div className="flex justify-between w-full">
          <div className="text-yellow-600 w-1/2">{char.vocation}</div>
          <div className="flex items-center w-1/2 ">
            <i className="pi pi-globe text-blue-400 mr-2" />
            <span className="text-lime-400">{char.world}</span>
          </div>
        </div>
      </div>
      <div className="absolute right-2 top-2 ">
        <Menu model={contextMenuItems} popup ref={menu} />
        <Button
          icon="pi pi-cog"
          className="bg-transparent border-none text-white hover:surface-50"
          onClick={(e) => menu.current?.toggle(e)}
        />
      </div>
    </div>
  );
}

export default CharacterCard;
