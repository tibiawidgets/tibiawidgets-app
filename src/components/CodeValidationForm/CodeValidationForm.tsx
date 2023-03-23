import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';

export interface ICodeValidationFormProps {
  email: string;
}

export function CodeValidationForm({ email }: ICodeValidationFormProps) {
  const [code, setCode] = useState<number>(0);
  return (
    <form>
      <div>
        <small className="text-gray-500">An email with a 6-digit code has been sent to {email}</small>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user" />
          </span>
          <InputNumber
            required
            name="username"
            id="username"
            aria-describedby="username-help"
            value={code}
            className="rounded-r-md flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
            type="email"
            placeholder="email@tibia.com"
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      </div>
      <button className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-700 w-full mt-6" type="submit">
        Send Email
      </button>
    </form>
  );
}
