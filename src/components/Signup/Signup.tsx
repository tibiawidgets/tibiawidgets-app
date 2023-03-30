import * as React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { SyntheticEvent } from 'react';

export interface ISignupProps {
  gotoLogin: () => void;
}

export type FieldName = 'username' | 'email' | 'password' | 'validatePass';

export default function Signup({ gotoLogin }: ISignupProps) {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validatePass, setValidatePass] = React.useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.currentTarget.name as FieldName;
    const fieldValue = event.currentTarget.value as FieldName;
    const actions = {
      username: () => setUsername(fieldValue),
      password: () => setPassword(fieldValue),
      email: () => setEmail(fieldValue),
      validatePass: () => setValidatePass(fieldValue)
    };
    actions[fieldName]();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user" />
        </span>
        <InputText
          required
          name="username"
          id="username"
          aria-describedby="username-help"
          value={username}
          className="rounded-r-md flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          type="text"
          placeholder="Username"
          autoFocus
          onChange={onChange}
        />
      </div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-envelope" />
        </span>
        <InputText
          required
          name="email"
          id="email"
          aria-describedby="email-help"
          value={email}
          className="rounded-r-md flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          type="email"
          placeholder="email@tibia.com"
          onChange={onChange}
        />
      </div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-lock" />
        </span>
        <InputText
          required
          name="password"
          id="password"
          aria-describedby="password-help"
          value={password}
          className="rounded-r-md flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          type="password"
          placeholder="Password"
          onChange={onChange}
        />
      </div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-lock" />
        </span>
        <InputText
          required
          name="validatePass"
          id="validatePass"
          aria-describedby="validatePass-help"
          value={validatePass}
          className="rounded-r-md flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          type="password"
          placeholder="Verify password"
          autoFocus
          onChange={onChange}
        />
      </div>
      <Button className="bg-blue-500 text-white hover:bg-blue-700 mt-4 w-full" label="Create account" type="submit" />
      <small className="flex justify-center items-center mt-4">
        Already have an account?{' '}
        <Button link className="underline text-primary ml-2 text-sm" onClick={gotoLogin}>
          Log in
        </Button>
      </small>
    </form>
  );
}
