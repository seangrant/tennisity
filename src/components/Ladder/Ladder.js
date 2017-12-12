import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Card, Text, Row } from '../StyleGuide';

const LadderQuery = gql`
  query LadderQuery($category: Int!, $ranking: Int!) {
    teams(category: $category, ranking: $ranking) {
      id
      name
      score
      club {
        name
      }
    }
  }
`;

const Ladder = ({ data: { teams = [] } } = {}) => (
  <div>
    <Row>
      <Text type="heading">Monday Ladies - 4</Text>
      <Text type="heading">Round 5</Text>
    </Row>
    <Card>
      {teams.map(team => (
        <Text key={team.id}>
          {team.name} {team.score}
        </Text>
      ))}
    </Card>
  </div>
);

export default graphql(LadderQuery, {
  options: ({ match }) => ({
    variables: {
      category: match.params.category,
      ranking: match.params.ranking
    }
  })
})(Ladder);
