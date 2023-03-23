import React from 'react';
import { Message } from 'primereact/message';
import { Tag } from 'primereact/tag';
import { useUserContext } from '../../contexts/UserContext';
import DropFileZone from '../../components/DropFileZone/DropFileZone';

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
  return (
    <div className="w-full">
      <h1 className="section-title outlined-title text-4xl">Solo Hunt Sessions</h1>
      <Message className="border-primary w-full justify-content-start mt-4" content={messageContent} />
      <EmptyHuntsScreen nSessions={userData.huntSessions.length} />
    </div>
  );
}

export default HuntSessions;
