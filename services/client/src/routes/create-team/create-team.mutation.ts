import gql from 'graphql-tag';

export const CREATE_TEAM = gql`
  mutation create_team($name: String!) {
    createTeam(data: { name: $name }) {
      id
      name
    }
  }
`;
