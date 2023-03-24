import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useUserContext } from '../../contexts/UserContext';
import DruidImage from '../../assets/Druid.png';
import KnightImage from '../../assets/Knight.png';
import SorcererImage from '../../assets/Sorcerer.png';
import PaladinImage from '../../assets/Paladin.png';
import CharacterAddForm from '../../components/CharacterAddform/CharacterAddForm';

function Characters() {
  const { userData } = useUserContext();
  const [visible, setVisible] = useState(false);
  const menu = useRef<Menu>(null);
  const contextMenuItems: MenuItem[] = [
    {
      label: 'Edit',
      icon: 'pi pi-user-edit'
    },
    { label: 'Remove', icon: 'pi pi-trash' }
  ];

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
    <div className="h-full">
      <h1 className="section-title outlined-title text-4xl">Characters</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {userData.characters.map((char) => {
          return (
            <div
              key={char.id}
              className="flex flex-col justify-between shadow-2 p-4 mb-5 lg:mb-0 mr-0 lg:mr-5 surface-card w-60 h-60 hover:surface-0 relative"
            >
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
        })}
        <div
          role="button"
          className="rounded shadow-2 p-4 mb-5 lg:mb-0 mr-0 lg:mr-5 surface-card w-60 h-60 hover:cursor-pointer hover:surface-0"
          onClick={() => setVisible(true)}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <Button
              className="p-button-rounded p-button-text p-button-outlined p-button-plain mr-2 "
              icon="pi pi-plus"
            />
            <div className="pt-4">
              <div className="text-xl text-900 font-medium mb-2">Add new character</div>
            </div>
          </div>
        </div>
      </div>
      <CharacterAddForm visible={visible} title="Add new Character" onClose={() => setVisible(false)} />
    </div>
  );
}

export default Characters;
