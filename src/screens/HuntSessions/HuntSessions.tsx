import React, { useMemo, useState } from 'react';
import { Message } from 'primereact/message';
import { Tag } from 'primereact/tag';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useUserContext } from '../../contexts/UserContext';
import DropFileZone from '../../components/DropFileZone/DropFileZone';
import { Character, Session } from '../../types/types';
import SessionsContent from '../../components/HuntSessions/SessionsContent';

type EmptyHuntsScreenType = {
  nSessions: number;
};

function EmptyHuntsScreen({ nSessions }: EmptyHuntsScreenType) {
  if (nSessions) return null;
  return <DropFileZone />;
}

const messageContent = (
  <div className="flex align-items-center">
    <i className="pi pi-exclamation-triangle text-lg font-bold text-yellow-700 " />
    <div className="ml-2 flex items-center">
      <span className="mr-2">
        You can add your <b>*.JSON</b> and <b>*.txt</b> files exported from the <b>Tibia Client</b> located at
      </span>{' '}
      <Tag>...\Tibia\packages\Tibia\log</Tag>
    </div>
  </div>
);

function HuntSessions() {
  const { userData } = useUserContext();
  const [selectedChar, setSelectedChar] = useState<Character | undefined>(undefined);

  const handleCharSelect = (event: DropdownChangeEvent) => {
    const char = userData.characters.find((_char: Character) => _char.id === event.value);
    setSelectedChar(char);
  };

  return (
    <div className="w-full">
      <h1 className="section-title outlined-title text-4xl">Solo Hunt Sessions</h1>
      <Dropdown
        value={selectedChar}
        onChange={handleCharSelect}
        options={userData.characters}
        optionLabel="name"
        optionValue="id"
        placeholder="Select a Character"
        className="w-full md:w-14rem"
      />
      {!userData.characters.length && (
        <Message className="border-primary w-full justify-content-start mt-4" content={messageContent} />
      )}
      <EmptyHuntsScreen nSessions={userData.characters.length} />
      <SessionsContent character={selectedChar} />
    </div>
  );
}

export default HuntSessions;
