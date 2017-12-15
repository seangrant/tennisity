import React from 'react';
import { graphql } from 'react-apollo';
import styled from 'react-emotion';
import gql from 'graphql-tag';
import withProps from 'recompose/withProps';

import {
  Card,
  Text,
  Row,
  Secondary,
  Column,
  FlexItem,
  border,
  margin
} from '../StyleGuide';

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

const Heading = withProps({ align: 'center' })(
  styled(Row)(({ theme }) => ({
    'border-top': border({ color: theme.colors.secondary }),
    'border-bottom': border({ color: theme.colors.secondary }),
    margin: margin({ top: theme.row * 2, bottom: theme.row * 3 })
  }))
);

const TableHeading = styled(Row)(({ theme }) => ({
  'border-bottom': border({ color: theme.colors.secondary }),
  'margin-bottom': theme.row * 2
}));

const TableRow = styled(Row)(({ theme, endOfFinals = false }) => ({
  'border-bottom': endOfFinals
    ? border({ color: theme.colors.primary })
    : 'none',
  'margin-bottom': theme.row * 2
}));

const LadderRow = (team, index) => (
  <TableRow endOfFinals={index === 3} key={team.id}>
    <FlexItem basis="80px">
      <Secondary type="subheading" centered>
        {index + 1}
      </Secondary>
    </FlexItem>
    <FlexItem grow="1">
      <Column>
        <Text type="subheading" margin={false}>
          {team.name}
        </Text>
        <Secondary>{team.club.name}</Secondary>
      </Column>
    </FlexItem>
    <FlexItem basis="70px">
      <Text type="subheading" centered>
        {team.score}
      </Text>
    </FlexItem>
  </TableRow>
);

const LadderPage = ({ data: { teams = [] } } = {}) => (
  <div>
    <Heading>
      <Column>
        <Text type="heading" margin={false}>
          Monday Ladies
        </Text>
        <Secondary type="subheading">Section 4</Secondary>
      </Column>
      <Text type="heading" raw>
        Round 5
      </Text>
    </Heading>
    <Card>
      <TableHeading>
        <FlexItem basis="80px">
          <Secondary centered>Rank</Secondary>
        </FlexItem>
        <FlexItem grow="1">
          <Secondary>Team</Secondary>
        </FlexItem>
        <FlexItem basis="70px">
          <Secondary centered>Points</Secondary>
        </FlexItem>
      </TableHeading>
      {teams.map(LadderRow)}
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
})(LadderPage);
