import * as React from 'react';

export interface ILogingInProps {
  email: string;
  onSuccessLogin: () => void;
}

export function LogingIn({ email, onSuccessLogin }: ILogingInProps) {
  setTimeout(() => {
    onSuccessLogin();
  }, 1000);
  return (
    <div className="flex flex-col items-center">
      <span className="pi pi-spin pi-spinner text-4xl mb-4" />
      <h2>Welcome {email}...</h2>
    </div>
  );
}
