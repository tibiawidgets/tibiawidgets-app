import { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import * as React from 'react';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';
import DruidImage from '../../assets/Druid.png';
import KnightImage from '../../assets/Knight.png';
import SorcererImage from '../../assets/Sorcerer.png';
import PaladinImage from '../../assets/Paladin.png';
import { Character } from '../../types/types';
import { useUserContext } from '../../contexts/UserContext';
import { deleteCharacter } from '../../services/tibia-widgets-api';

interface ICharacterCardProps {
  character: Character;
}

function CharacterCard({ character: char }: ICharacterCardProps) {
  const menu = useRef<Menu>(null);
  const { updateCharacters } = useUserContext();
  const contextMenuItems: MenuItem[] = [
    {
      id: char.id,
      label: 'Edit',
      icon: 'pi pi-user-edit',
      command: (ev: MenuItemCommandEvent) => {
        console.log(ev);
      }
    },
    {
      id: char.id,
      label: 'Remove',
      icon: 'pi pi-trash',
      command: (ev: MenuItemCommandEvent) => {
        removeCharacter(ev.item.id).then(() => updateCharacters());
      }
    }
  ];
  const removeCharacter = (id: string) => {
    return deleteCharacter(id);
  };

  const getVocationImage = (vocation: string) => {
    switch (vocation) {
      case 'Paladin':
        return PaladinImage;
      case 'Knight':
        return KnightImage;
      case 'Druid':
        return DruidImage;
      case 'Sorcerer':
      default:
        return SorcererImage;
    }
  };
  return (
    <div className="flex flex-col justify-between shadow-2 p-4 mb-5 lg:mb-0 mr-0 lg:mr-5 surface-card w-60 h-60 hover:surface-0 relative">
      <img className="w-1/2 self-center" height="170px" alt={char.name} src={getVocationImage(char.vocation)} />
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
