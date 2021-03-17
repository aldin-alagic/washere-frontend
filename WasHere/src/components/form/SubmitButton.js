import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useFormikContext } from 'formik';

import AppButton from '../Button';

import colors from '../../config/colors';

const SubmitButton = ({ title, loading }) => {
  const { handleSubmit } = useFormikContext();

  return loading ? <ActivityIndicator style={{ marginTop: 10 }} size="large" color={colors.primary} /> : <AppButton title={title} onPress={handleSubmit} />;
};

export default SubmitButton;