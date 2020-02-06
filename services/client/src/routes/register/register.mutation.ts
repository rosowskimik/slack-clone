import gql from 'graphql-tag';

export default gql`
  mutation registerUser(
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
