import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { AxiosResponse } from 'axios';
import { validateCode } from '../../services/tibia-widgets-api';

export interface ICodeValidationFormProps {
  email: string;
  onSubmitSuccess: (token: string) => void;
}

export type ValidCodeReponse = {
  token: string;
};

export function CodeValidationForm({ email, onSubmitSuccess }: ICodeValidationFormProps) {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: any): void => {
    e.preventDefault();
    setIsLoading(true);
    validateCode(email, code)
      .then(({ data }: AxiosResponse<ValidCodeReponse>) => {
        onSubmitSuccess(data.token);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <small className="text-gray-500">An email with a 6-digit code has been sent to {email}</small>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user" />
          </span>
          <InputText
            required
            name="code"
            id="code"
            aria-describedby="username-help"
            value={code}
            placeholder="123456"
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      </div>
      <Button
        className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-700 w-full mt-6"
        type="submit"
        icon="pi pi-check"
        iconPos="right"
        label="Validate Code"
        loading={isLoading}
      />
    </form>
  );
}
