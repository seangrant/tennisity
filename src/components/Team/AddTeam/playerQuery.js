import gql from 'graphql-tag';

export default gql`
  query PlayerQuery($teamId: Int!) {
    teamPlayers(teamId: $teamId) {
      id
      name
      email
    }
  }
`;
