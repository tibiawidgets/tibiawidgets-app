import React, { createContext, useContext, useMemo, useState } from 'react';
import { Session } from '../types/types';

type UserDataType = {
  email: string;
  huntSessions: Session[];
  config: Record<string, unknown>;
};

type UserContextType = {
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
  userData: UserDataType;
  isLoginOpen: boolean;
};

const initialValue: UserContextType = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openLoginDialog: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeLoginDialog: () => {},
  userData: {
    email: '',
    huntSessions: [],
    config: {}
  },
  isLoginOpen: false
};

const UserContext = createContext<UserContextType>(initialValue);

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState<UserDataType>(initialValue.userData);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
      isLoginOpen: isLoginModalOpen
    }),
    [userData, isLoginModalOpen]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
