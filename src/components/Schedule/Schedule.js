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

const SchedulePage = ({ data: { team: { matches = [] } = {} } } = {}) => (
  <div>
    {matches.map(match => (
      <Card>
        <Section>{match.round}</Section>
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
