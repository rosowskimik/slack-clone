import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { useMutation } from '@apollo/react-hooks';

import { login, loginVariables } from '../../../generated/login.gql';
import CustomForm from '../../components/custom-form/custom-form.component';
import InputField from '../../components/input-field/input-field.component';
import { LOGIN } from './login.mutation';
import validationSchema from './login.validation';

const initialValues = {
  email: '',
  password: ''
};

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [mutate, { error, loading }] = useMutation<login, loginVariables>(
    LOGIN
  );

  return (
    <CustomForm
      header='Login'
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async values => {
        try {
          await mutate({ variables: values });
          history.push('/');
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
