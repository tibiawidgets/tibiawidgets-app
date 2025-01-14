import React from 'react';
import { Ripple } from 'primereact/ripple';
import { Button } from 'primereact/button';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { AuthDialog } from './AuthDialog/AuthDialog';
import LoginButton from './LoginButton/LoginButton';
import Logo from '../assets/logos/tibia-hunts-logo-green-text.svg';

const darshboardMenu = [
  {
    label: 'Home',
    icon: 'pi pi-home ',
    url: '/',
    protected: false
  },
  {
    label: 'Party Loot Share',
    icon: 'pi pi-bookmark',
    url: '/party-loot',
    protected: false
  },
  {
    label: 'Characters',
    icon: 'pi pi-user',
    url: '/characters',
    protected: true
  },
  {
    label: 'Solo Hunt Sessions',
    icon: 'pi pi-chart-bar',
    url: '/hunt-sessions'
  }
];

function SideBar() {
  const { openLoginDialog, closeLoginDialog, isLoginOpen, isLoggedIn } = useUserContext();

  return (
    <div
      id="app-sidebar-8"
      className="h-full left-0 top-0 z-1 border-right-1 select-none animation-duration-300 animation-ease-in-out border-white-alpha-10"
      style={{ backgroundImage: 'linear-gradient(60deg, #29323c 0%, #2f3844 100%)' }}
    >
      <div className="flex flex-col h-full relative">
        <div className="flex items-center px-3 flex-shrink-0 mt-4 mb-2">
          <img src={Logo} alt="Tibia Hunts" />
        </div>
        <ul className="list-none p-0 m-0 overflow-hidden">
          {darshboardMenu.map((item) => {
            if (item.protected && !isLoggedIn) return null;
            return (
              <li key={item.label}>
                <NavLink
                  to={item.url}
                  className="flex align-items-center cursor-pointer p-3 text-gray-300 hover:bg-bluegray-700 transition-duration-150 transition-color text-brown"
                  style={{ borderRadius: '30px' }}
                >
                  <i className={`${item.icon} mr-2 self-center`} />
                  <span className="font-medium">{item.label}</span>
                  <Ripple />
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="absolute bottom-0 p-4 right-0 left-0">
          <LoginButton onClick={() => openLoginDialog()} />
        </div>
      </div>
      <AuthDialog visible={isLoginOpen} onHide={() => closeLoginDialog()} />
    </div>
  );
}

export default SideBar;
