import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation register_user(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      data: { username: $username, email: $email, password: $password }
    ) {
      id
      username
      email
    }
  }
`;
