import React, { useState } from 'react';

type EmptyHuntsScreenType = {
  nSessions: number;
};

function EmptyHuntsScreen({ nSessions }: EmptyHuntsScreenType) {
  if (nSessions) return null;
  return (
    <div className="h-80 mt-8 flex justify-center items-center border-gray-400 border border-dashed border-4">
      <p className="text-gray-500 flex flex-col items-center">
        <span className="text-xl">No hunt sessions</span>
        <span className="text-md">Drop your files here or click to open Dialog</span>
      </p>
    </div>
  );
}

function HuntSessions() {
  const [huntSessions, setHuntSessions] = useState([]);
  return (
    <div className="w-full">
      <h1 className="section-title outlined-title text-4xl">Solo Hunt Sessions</h1>
      <EmptyHuntsScreen nSessions={huntSessions.length} />
    </div>
  );
}

export default HuntSessions;
