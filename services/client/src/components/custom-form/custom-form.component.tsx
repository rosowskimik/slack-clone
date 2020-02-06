import { ApolloError } from 'apollo-boost';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import React from 'react';
import { Container, Form, Header, Message } from 'semantic-ui-react';
import * as yup from 'yup';

interface Props<Values extends FormikValues> {
  header: string;
  loading?: boolean;
  error?: ApolloError | undefined;
  validationSchema: yup.Schema<any>;
  initialValues: Values;
  onSubmit: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<void>;
  children: React.ReactNode;
}

const CustomForm = <Values extends FormikValues>({
  header,
  loading,
  error,
  validationSchema,
  initialValues,
  onSubmit,
  children
}: Props<Values>): JSX.Element => {
  return (
    <Container text>
      <Header as='h1' textAlign='center'>
        {header}
      </Header>

      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} loading={loading} error={!!error}>
            {error && (
              <Message error>
                {JSON.stringify(error?.graphQLErrors[0], null, 2)}
              </Message>
            )}
            {children}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CustomForm;
