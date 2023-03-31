import React, { useState } from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useUserContext } from '../../contexts/UserContext';
import { Character, Session } from '../../types/types';
import SessionsContent from '../../components/HuntSessions/SessionsContent';

function HuntSessions() {
  const { userData } = useUserContext();
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const options = [{ id: 'all', name: 'Show All' }, ...userData.characters];

  const handleCharSelect = (event: DropdownChangeEvent) => {
    const char = userData.characters.find((_char: Character) => _char.id === event.value);
    setSelectedChar(char || null);
  };
  const selectedCharTemplate = (option, props) => {
    if (props.value) {
      return (
        <div className="flex align-items-center">
          <div>{props.value}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const charOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <h1 className="section-title outlined-title text-4xl">Solo Hunt Sessions</h1>
      <SessionsContent character={selectedChar} />
    </div>
  );
}

export default HuntSessions;
