import gql from 'graphql-tag';

export default gql`
  query ClubQuery($category: Int!) {
    teams(category: $category) {
      id
      name
    }
  }
`;
