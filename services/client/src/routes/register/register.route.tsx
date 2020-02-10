import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { useMutation } from '@apollo/react-hooks';

import { register_user, register_userVariables } from '../../../generated/register_user.gql';
import CustomForm from '../../components/custom-form/custom-form.component';
import InputField from '../../components/input-field/input-field.component';
import { REGISTER } from './register.mutation';
import validationSchema from './register.validation';

const initialValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [mutate, { error, loading }] = useMutation<
    register_user,
    register_userVariables
  >(REGISTER);

  return (
    <CustomForm
      header='Register'
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={loading}
      error={error?.graphQLErrors[0]?.message}
      onSubmit={async values => {
        try {
          await mutate({ variables: values });
          history.push('/login');
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
