import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './AppBar';
import SideBar from './components/SideBar';
import HuntSessions from './screens/HuntSessions/HuntSessions';
import PartyLoot from './screens/PartyLoot/PartyLoot';
import Home from './screens/Home/Home';
import Login from './components/Login';

function App() {
  console.log(window.ipcRenderer);

  const [isOpen, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [fromMain, setFromMain] = useState<string | null>(null);

  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
      setSent(false);
    } else {
      setOpen(true);
      setFromMain(null);
    }
  };
  const sendMessageToElectron = () => {
    if (window.Main) {
      window.Main.sendMessage("Hello I'm from React World");
    } else {
      setFromMain('You are in a Browser, so no Electron functions are available');
    }
    setSent(true);
  };

  useEffect(() => {
    if (isSent && window.Main)
      window.Main.on('message', (message: string) => {
        setFromMain(message);
      });
  }, [fromMain, isSent]);

  return (
    <Router>
      <div className="mainContainer">
        <div>{window.Main && <AppBar />}</div>
        <div className="content-container">
          <div className="sidebar-container">
            <SideBar />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/party-loot" element={<PartyLoot />} />
              <Route path="/hunt-sessions" element={<HuntSessions />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
