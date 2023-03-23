import React, { useMemo, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { CodeValidationForm } from '../CodeValidationForm/CodeValidationForm';
import Login from '../Login/Login';
import { LogingIn } from '../LoginIn';

export interface IAuthDialogProps {
  visible: boolean;
  onHide: () => void;
}

const STEP_LOGININ = 'loginIn';
const STEP_VERIFICATION = 'verification';
const STEP_EMAIL = 'email';

type StepType = typeof STEP_EMAIL | typeof STEP_VERIFICATION | typeof STEP_LOGININ;

export function AuthDialog({ visible, onHide }: IAuthDialogProps) {
  const [step, setStep] = useState<StepType>('email');
  const [emailTo, setEmailTo] = useState('');
  const title = useMemo(() => {
    switch (step) {
      case 'verification':
        return 'Validate your code';
      case 'loginIn':
        return 'Successful validation';
      case 'email':
      default:
        return 'Enter your email';
    }
  }, [step]);
  const onEmailSent = (email: string) => {
    setStep('verification');
    setEmailTo(email);
  };
  const onClose = () => {
    setStep('email');
    onHide();
  };
  const onCodeValidated = (token: string) => {
    localStorage.setItem('token', token);
    setStep('loginIn');
  };
  const onUserLoaded = () => {
    onClose();
  };
  const child = useMemo(() => {
    if (step === 'email') {
      return <Login onSubmitSuccess={onEmailSent} />;
    }
    if (step === 'verification') {
      return <CodeValidationForm email={emailTo} onSubmitSuccess={onCodeValidated} />;
    }
    return <LogingIn email={emailTo} onSuccessLogin={onUserLoaded} />;
  }, [step, emailTo]);
  return (
    <Dialog className="w-80" visible={visible} header={title} onHide={onClose}>
      {child}
    </Dialog>
  );
}
