import gql from 'graphql-tag';

export default gql`
  query ClubQuery {
    allClubs {
      name
      code
    }
  }
`;
