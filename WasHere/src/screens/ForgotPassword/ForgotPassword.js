import React, { useState } from 'react';

import ResetForm from './components/ResetForm';
import CodeForm from './components/CodeForm';
import NewPasswordForm from './components/NewPasswordForm';

export const stages = {
  REQUEST_CODE: 'REQUEST_CODE',
  VERIFY_CODE: 'VERIFY_CODE',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
};

const ForgotPassword = ({ navigation }) => {
  const [stage, setStage] = useState(stages.REQUEST_CODE);
  const [resetCode, setResetCode] = useState('');
  return (
    <>
      {stage === stages.REQUEST_CODE && <ResetForm setStage={setStage} />}
      {stage === stages.VERIFY_CODE && <CodeForm setStage={setStage} setResetCode={setResetCode} />}
      {stage === stages.CHANGE_PASSWORD && <NewPasswordForm setStage={setStage} resetCode={resetCode} navigation={navigation} />}
    </>
  );
};

export default ForgotPassword;
