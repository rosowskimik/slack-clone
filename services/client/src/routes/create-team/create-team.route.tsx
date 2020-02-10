import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { useMutation } from '@apollo/react-hooks';

import { create_team, create_teamVariables } from '../../../generated/create_team.gql';
import CustomForm from '../../components/custom-form/custom-form.component';
import InputField from '../../components/input-field/input-field.component';
import { CREATE_TEAM } from './create-team.mutation';
import { validationSchema } from './create-team.validation';

const initialValues = { name: '' };

const CreateTeam: React.FC<RouteComponentProps> = ({ history }) => {
  const [mutate, { error, loading }] = useMutation<
    create_team,
    create_teamVariables
  >(CREATE_TEAM);

  return (
    <CustomForm
      header='Create Team'
      initialValues={initialValues}
      validationSchema={validationSchema}
      error={error?.graphQLErrors[0]?.message}
      loading={loading}
      onSubmit={async ({ name }) => {
        try {
          await mutate({ variables: { name } });
          history.push('/');
        } catch (error) {}
      }}
    >
      <InputField label='Team Name' name='name' placeholder='Team Name' />
      <Button type='submit'>Submit</Button>
    </CustomForm>
  );
};

export default CreateTeam;
