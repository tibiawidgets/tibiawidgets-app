import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import { UserType } from '../types/types';
import { getUserByEmail } from '../services/tibia-widgets-api';

type UserContextType = {
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
  userData: UserType;
  isLoginOpen: boolean;
  fetchUserData: (email: string) => Promise<void>;
  isLoggedIn: boolean;
};

const initialValue: UserContextType = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openLoginDialog: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeLoginDialog: () => {},
  userData: {
    _id: '0',
    email: localStorage.getItem('email') || '',
    characters: [],
    clientOptions: {}
  },
  isLoginOpen: false,
  isLoggedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchUserData: () => new Promise(() => {})
};

const UserContext = createContext<UserContextType>(initialValue);

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState<UserType>(initialValue.userData);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(initialValue.isLoginOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(initialValue.isLoggedIn);

  useEffect(() => {
    if (userData && userData.email) {
      fetchUserData(userData.email);
    }
  }, [userData.email]);

  const fetchUserData = (email: string) => {
    return getUserByEmail(email).then((response: AxiosResponse<{ user: UserType }>) => {
      const { user } = response.data;
      setUserData(user);
      setIsLoggedIn(true);
      // save email for persistance
      localStorage.setItem('email', email);
    });
  };

  const openLoginDialog = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginDialog = () => {
    setIsLoginModalOpen(false);
  };

  const value = useMemo(
    () => ({
      openLoginDialog,
      closeLoginDialog,
      userData,
      isLoginOpen: isLoginModalOpen,
      fetchUserData,
      isLoggedIn
    }),
    [userData, isLoginModalOpen, isLoggedIn]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
