import * as React from 'react';
import { useUserContext } from '../contexts/UserContext';

export interface ILogingInProps {
  email: string;
  onSuccessLogin: () => void;
}

export function LogingIn({ email, onSuccessLogin }: ILogingInProps) {
  const { fetchUserData } = useUserContext();
  React.useEffect(() => {
    fetchUserData(email).then(() => {
      onSuccessLogin();
    });
  });
  return (
    <div className="flex flex-col items-center">
      <span className="pi pi-spin pi-spinner text-4xl mb-4" />
      <h2>Welcome {email}...</h2>
    </div>
  );
}
