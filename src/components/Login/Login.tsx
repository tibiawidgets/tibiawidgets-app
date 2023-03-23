import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { login as userLogin } from '../../services/tibia-widgets-api';

type StepType = 'email' | 'verification';

function Login() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(null);
  const [step, setStep] = useState<StepType>('email');

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.currentTarget.name === 'username') {
      setUsername(event.currentTarget.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    userLogin(username).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div className="p-inputgroup">
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
            onChange={onChange}
          />
        </div>
        <small className="text-gray-500">We will send an email to authenticate you.</small>
      </div>
      <div className="">
        <Button
          ref={emailRef}
          className="bg-blue-500 text-white hover:bg-blue-700 mt-6 w-full"
          label="Send Email"
          iconPos="right"
          icon="pi pi-send"
          type="submit"
          loading={isLoading}
        />
      </div>
    </form>
  );
}

export default Login;
