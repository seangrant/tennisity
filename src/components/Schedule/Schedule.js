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

const ScheduleQuery = gql`
  query ScheduleQuery($id: Int!) {
    team(id: $id) {
      name
      matches {
        round
        homeTeam {
          id
          name
        }
        awayTeam {
          id
          name
        }
        club {
          name
        }
      }
    }
  }
`;

const Divider = withProps({ basis: '2px' })(
  styled(FlexItem)(({ theme }) => ({
    'background-color': theme.colors.primary,
    transform: 'skew(-10deg)',
    width: '2px',
    height: '100%'
  }))
);

const Vs = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: `calc(50% - ${theme.row * 9}px)`,
  top: theme.row * 5,
  height: theme.row * 18,
  width: theme.row * 18,
  'border-radius': 65,
  border: border({ size: 2, color: theme.colors.primary }),
  display: 'flex',
  'align-items': 'center'
}));

const VsText = withProps({ basis: '50%' })(
  styled(FlexItem)(({ theme }) => ({
    'text-align': 'center',
    'font-size': 48,
    'font-weight': 'bold',
    color: theme.colors.darkPrimary
  }))
);

const SchedulePage = ({ data: { team: { name, matches = [] } = {} } } = {}) => (
  <div>
    <Row>
      <Text type="heading" light>
        {name}
      </Text>
    </Row>
    {matches.map(match => (
      <Card>
        <Row rows={30}>
          <FlexItem basis="calc(50% - 1px)">Content</FlexItem>
          <Divider />
          <FlexItem basis="calc(50% - 1px)" />
        </Row>
        <Vs>
          <VsText basis="50%">V</VsText>
          <VsText basis="50%">S</VsText>
        </Vs>
      </Card>
    ))}
  </div>
);

export default graphql(ScheduleQuery, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id
    }
  })
})(SchedulePage);
