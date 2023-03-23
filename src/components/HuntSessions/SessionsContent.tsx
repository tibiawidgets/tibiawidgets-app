import * as React from 'react';
import { Character, Session } from '../../types/types';

export interface SessionsContentProps {
  character: Character | null;
}

export default function App({ character }: SessionsContentProps) {
  return (
    <div className="flex flex-col">
      <span>Character: {character?.name}</span>
      <span>Hunt Sessions</span>
      {character?.huntSessions?.map((session: Session) => {
        return <div key={session.id}>{session.id}</div>;
      })}
    </div>
  );
}
