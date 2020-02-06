import React from 'react';
import { Button } from 'semantic-ui-react';

import { useMutation } from '@apollo/react-hooks';

import { registerUser, registerUserVariables } from '../../../generated/registerUser.gql';
import CustomForm from '../../components/custom-form/custom-form.component';
import InputField from '../../components/input-field/input-field.component';
import REGISTER from './register.mutation';
import validationSchema from './register.validation';

interface Props {}

const initialValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

const Register: React.FC<Props> = () => {
  const [executeMutation, { error, loading }] = useMutation<
    registerUser,
    registerUserVariables
  >(REGISTER);

  return (
    <CustomForm
      header='Register'
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={loading}
      error={error}
      onSubmit={async (values, { resetForm }) => {
        try {
          await executeMutation({ variables: values });
          resetForm();
        } catch (_) {}
      }}
    >
      <InputField label='Username' name='username' placeholder='Username' />
      <InputField label='Email' name='email' placeholder='Email' />
      <InputField
        type='password'
        name='password'
        label='Password'
        placeholder='Password'
      />
      <InputField
        type='password'
        name='passwordConfirm'
        label='Confirm password'
        placeholder='Confirm Password'
      />

      <Button type='submit'>Submit</Button>
    </CustomForm>
  );
};

export default Register;
