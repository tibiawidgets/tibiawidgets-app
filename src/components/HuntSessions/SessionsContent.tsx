import * as React from 'react';
import { useMemo } from 'react';
import { Message } from 'primereact/message';
import { Tag } from 'primereact/tag';
import { Character, Session } from '../../types/types';
import { useUserContext } from '../../contexts/UserContext';
import DropFileZone from '../DropFileZone/DropFileZone';

export interface SessionsContentProps {
  character: Character | null;
}

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

export default function App({ character }: SessionsContentProps) {
  const { userData } = useUserContext();
  const characterHunts = userData.characters.find((char) => char.id === character?.id)?.huntSessions;
  if (!characterHunts?.length) {
    return (
      <div>
        <Message className="border-primary w-full justify-content-start mt-4" content={messageContent} />
        <EmptyHuntsScreen nSessions={characterHunts?.length || 0} />
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <span>Character: {character?.name}</span>
      <span>Hunt Sessions</span>
      {characterHunts?.map((session: Session) => {
        return <div key={session.id}>{session.id}</div>;
      })}
    </div>
  );
}
