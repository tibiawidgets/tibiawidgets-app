import React, { SyntheticEvent, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

type PasswordTextFieldType = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (target: SyntheticEvent<HTMLInputElement>) => void;
  required?: boolean;
};

function PasswordTextField({ id, name, label, value, onChange, ...rest }: PasswordTextFieldType) {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <label htmlFor={id} className="">
      <span className="font-bold text-gray-500">{label}</span>
      <div className="relative mt-1">
        <InputText
          {...rest}
          required
          name={name}
          type={isHidden ? 'password' : 'text'}
          id={id}
          className="rounded-r-md flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          value={value}
          onChange={onChange}
        />
        <Button
          type="button"
          className="absolute top-0 right-0 mt-3 mr-4 h-4 w-4 hover:bg-gray-300 rounded-lg"
          onClick={() => setIsHidden((prev) => !prev)}
          icon={isHidden ? 'pi pi-eye-slash' : 'pi pi-eye'}
        />
      </div>
    </label>
  );
}

export default PasswordTextField;
