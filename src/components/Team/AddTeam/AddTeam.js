import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Select from 'react-select';
import { graphql, compose } from 'react-apollo';

import { Card } from '../../StyleGuide';
import ClubQuery from './clubQuery';
import TeamQuery from './teamQuery';

const formName = 'addTeamForm';
// const selector = formValueSelector(formName);

class AddTeam extends Component {
  static propTypes = {
    clubs: PropTypes.shape({
      allClubs: PropTypes.array
    }).isRequired,
    teams: PropTypes.shape({
      teams: PropTypes.array,
      refetch: PropTypes.func
    }).isRequired
  };

  renderClubSelect = ({ input, options }) => (
    <Select value={input.value} options={options} onChange={input.onChange} />
  );

  renderTeamSelect = ({ input, options }) => (
    <Select value={input.value} options={options} onChange={input.onChange} />
  );

  render() {
    console.log({ props: this.props });
    const {
      clubs: { allClubs = [] },
      teams: { teams = [], refetch }
    } = this.props;

    const clubOptions = allClubs.map(club => ({
      value: club.code,
      label: club.name
    }));

    const teamOptions = teams.map(team => ({
      value: team.id,
      label: team.name
    }));

    return (
      <Card>
        <Form>
          <Form.Field>
            <label htmlFor="teamName">Team Name</label>
            <Field
              id="club"
              name="club"
              component={this.renderClubSelect}
              type="text"
              placeholder="Club Name"
              options={clubOptions}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="clubName">Club Name</label>
            <Field
              id="clubName"
              name="clubName"
              component="input"
              type="text"
              placeholder="Team Name"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="teamName">Team Name</label>
            <Field
              id="teamName"
              name="teamName"
              component={this.renderTeamSelect}
              type="text"
              placeholder="Club Name"
              options={teamOptions}
            />
          </Form.Field>
          <Form.Field>
            <button
              onClick={() =>
                refetch({
                  category: 2
                })
              }
            >
              RE-do
            </button>
          </Form.Field>
        </Form>
      </Card>
    );
  }
}

const clubQuery = graphql(ClubQuery, { name: 'clubs' });

const categoryTeamsQuery = graphql(TeamQuery, {
  name: 'teams',
  options: ({ match }) => {
    console.log('refetch');
    return {
      variables: {
        category: match.params.category
      }
    };
  }
});
const form = reduxForm({
  form: formName
});

export default compose(clubQuery, categoryTeamsQuery, form)(AddTeam);
