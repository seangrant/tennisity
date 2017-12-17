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
  Section,
  margin,
  border
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
    margin: margin({ top: theme.row * 2, bottom: theme.row * 3 })
  }))
);

const TableHeading = withProps({ rows: 5 })(
  styled(Row)(({ theme }) => ({
    'margin-bottom': theme.row
  }))
);

const TableRow = styled(Row)(({ theme }) => ({
  'margin-bottom': theme.row * 2
}));

const Position = withProps({
  type: 'subheading',
  centered: true,
  raw: true
})(
  styled(Text)(({ theme }) => ({
    border: border({ size: 2, color: theme.colors.primary }),
    color: theme.colors.primary,
    'border-radius': 22,
    height: theme.row * 7,
    width: theme.row * 7,
    margin: 'auto',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center'
  }))
);

const LadderRow = (team, index) => (
  <TableRow endOfFinals={index === 3} key={team.id}>
    <FlexItem align="center" basis="130px">
      <Position>{index + 1}</Position>
    </FlexItem>
    <FlexItem grow="1">
      <Column>
        <Text type="subheading" margin={false}>
          {team.name}
        </Text>
        <Secondary>{team.club.name}</Secondary>
      </Column>
    </FlexItem>
    <FlexItem align="center" basis="100px">
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
        <Text type="heading" strong light margin={false}>
          Monday Ladies
        </Text>
        <Text type="subheading" light>
          Section 4
        </Text>
      </Column>
      <Text type="heading" light raw>
        Round 5
      </Text>
    </Heading>
    <Card>
      <Section>
        <TableHeading>
          <FlexItem basis="130px">
            <Secondary centered raw>
              Rank
            </Secondary>
          </FlexItem>
          <FlexItem grow="1">
            <Secondary raw>Team</Secondary>
          </FlexItem>
          <FlexItem basis="100px">
            <Secondary centered raw>
              Points
            </Secondary>
          </FlexItem>
        </TableHeading>
        {teams.map(LadderRow)}
      </Section>
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
