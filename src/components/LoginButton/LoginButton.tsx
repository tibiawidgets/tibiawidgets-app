import * as React from 'react';
import { Button } from 'primereact/button';
import { useUserContext } from '../../contexts/UserContext';

export interface ILoginButtonProps {
  onClick: () => void;
}

export default function LoginButton({ onClick }: ILoginButtonProps) {
  const {
    isLoggedIn,
    userData: { email }
  } = useUserContext();
  if (isLoggedIn) {
    return <div>Welcome {email}</div>;
  }
  return <Button className="font-medium w-full" icon="pi pi-user" label="Login" onClick={onClick} />;
}
