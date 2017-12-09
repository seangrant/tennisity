import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LadderQuery = gql`
  query LadderQuery($category: String!, $ranking: Int!) {
    teams(category: $category, ranking: $ranking) {
      name
      score
    }
  }
`;

const Ladder = ({ data: { teams = [] } } = {}) => [
  teams.map(team => (
    <div>
      {team.name} {team.score}
    </div>
  ))
];

export default graphql(LadderQuery, {
  options: ({ match }) => ({
    variables: {
      category: match.params.category,
      ranking: match.params.ranking
    }
  })
})(Ladder);
