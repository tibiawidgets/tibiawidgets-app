import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { useUserContext } from '../../contexts/UserContext';
import CharacterAddForm from '../../components/CharacterAddform/CharacterAddForm';
import CharacterCard from '../../components/CharacterCard/CharacterCard';

function Characters() {
  const { userData } = useUserContext();
  const [visible, setVisible] = useState(false);

  return (
    <div className="h-full">
      <h1 className="section-title outlined-title text-4xl">Characters</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {userData.characters.map((char) => {
          return <CharacterCard key={char.id} character={char} />;
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
