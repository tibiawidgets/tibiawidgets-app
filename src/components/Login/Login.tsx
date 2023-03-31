import React, { FormEvent, SyntheticEvent, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useUserContext } from '../../contexts/UserContext';
import { LoginType } from '../../types/types';

function Login({ onSubmitSuccess, goToCreate }: LoginType) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(null);
  const { login: userLogin } = useUserContext();

  const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.currentTarget.name === 'username') {
      setUsername(event.currentTarget.value);
    }
    if (event.currentTarget.name === 'password') {
      setPassword(event.currentTarget.value);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    return userLogin(username, password)
      .then(({ email }) => {
        onSubmitSuccess(email);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
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
            type="email"
            placeholder="email@tibia.com"
            autoFocus
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
            placeholder="Password"
            className="rounded-r-md flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
            type={showPassword ? 'text' : 'password'}
            onChange={onChange}
          />
          <Button
            text
            type="button"
            className={`pi ${showPassword ? 'pi-eye' : 'pi-eye-slash'}`}
            onClick={() => setShowPass(!showPassword)}
          />
        </div>
      </div>
      <small className="flex justify-center items-center mt-4">
        Don&apos;t have an account?{' '}
        <Button link type="button" className="underline text-primary ml-2 text-sm" onClick={goToCreate}>
          Create one
        </Button>
      </small>
      <Button
        ref={emailRef}
        className="bg-blue-500 text-white hover:bg-blue-700 mt-4 w-full"
        label="Login"
        type="submit"
        loading={isLoading}
      />
    </form>
  );
}

export default Login;
