import * as React from 'react';
import { getUserByEmail } from '../services/tibia-widgets-api';

export interface ILogingInProps {
  email: string;
  onSuccessLogin: () => void;
}

export function LogingIn({ email, onSuccessLogin }: ILogingInProps) {
  React.useEffect(() => {
    getUserByEmail(email).then(() => {
      onSuccessLogin();
    });
  });
  return (
    <div className="flex flex-col items-center">
      <span className="pi pi-user w-12 h-20" />
      <h2>Welcome {email}...</h2>
    </div>
  );
}