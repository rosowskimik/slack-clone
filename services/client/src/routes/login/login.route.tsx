import React from 'react';
import { Button } from 'semantic-ui-react';

import { useMutation } from '@apollo/react-hooks';

import { login, loginVariables } from '../../../generated/login.gql';
import CustomForm from '../../components/custom-form/custom-form.component';
import InputField from '../../components/input-field/input-field.component';
import { LOGIN } from './login.mutation';
import validationSchema from './login.validation';

interface Props {}

const initialValues = {
  email: '',
  password: ''
};

const Login: React.FC<Props> = () => {
  const [mutate, { error, loading }] = useMutation<login, loginVariables>(
    LOGIN
  );

  return (
    <CustomForm
      header='Login'
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await mutate({ variables: values });
          resetForm();
        } catch (_) {}
      }}
      error={error?.graphQLErrors[0]?.message}
      loading={loading}
    >
      <InputField label='Email' name='email' placeholder='Email' />
      <InputField
        label='Password'
        name='password'
        placeholder='Password'
        type='password'
      />
      <Button type='submit'>Submit</Button>
    </CustomForm>
  );
};

export default Login;
