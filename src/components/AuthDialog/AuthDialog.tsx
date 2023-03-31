import React, { useMemo, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import Login from '../Login/Login';
import { LogingIn } from '../LoginIn';
import Signup from '../Signup/Signup';

export interface IAuthDialogProps {
  visible: boolean;
  onHide: () => void;
}

const STEP_LOGININ = 'loginIn';
const STEP_VERIFICATION = 'verification';
const STEP_LOGIN = 'login';
const STEP_SIGNUP = 'signup';

const stepTitles = {
  [STEP_VERIFICATION]: 'Validate your code',
  [STEP_LOGININ]: 'Successful login',
  [STEP_LOGIN]: 'Login',
  [STEP_SIGNUP]: 'Create an account'
};

type StepType = typeof STEP_LOGIN | typeof STEP_VERIFICATION | typeof STEP_LOGININ | typeof STEP_SIGNUP;

export function AuthDialog({ visible, onHide }: IAuthDialogProps) {
  const [step, setStep] = useState<StepType>(STEP_LOGIN);
  const [emailTo, setEmailTo] = useState('');
  const title = stepTitles[step];
  const onEmailSent = (email: string) => {
    setStep(STEP_LOGININ);
    setEmailTo(email);
  };
  const onClose = () => {
    onHide();
    setStep(STEP_LOGIN);
  };
  const onUserLoaded = () => {
    onClose();
  };
  const goToCreate = () => setStep(STEP_SIGNUP);

  const child = useMemo(() => {
    if (step === STEP_LOGIN) {
      return <Login onSubmitSuccess={onEmailSent} goToCreate={goToCreate} />;
    }
    if (step === STEP_SIGNUP) {
      return <Signup gotoLogin={() => setStep(STEP_LOGIN)} />;
    }
    return <LogingIn email={emailTo} onSuccessLogin={onUserLoaded} />;
  }, [step, emailTo]);
  return (
    <Dialog className="w-80" visible={visible} header={title} onHide={onClose}>
      {child}
    </Dialog>
  );
}
