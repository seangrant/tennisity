import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import { Card } from '../../StyleGuide';
import ClubQuery from './clubQuery';
import TeamQuery from './teamQuery';

import PlayerList from './PlayerList/PlayerList';

const formName = 'addTeamForm';
const selector = formValueSelector(formName);

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
    console.log({ addTeamProps: this.props });
    const {
      clubs: { allClubs = [] },
      teams: { teams = [] },
      currentTeam
    } = this.props;
    console.log({ currentTeam });
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
            <label htmlFor="teamName">Team</label>
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
            <label htmlFor="teamName">Club</label>
            <Field
              id="club"
              name="club"
              component={this.renderClubSelect}
              type="text"
              placeholder="Club Name"
              options={clubOptions}
            />
          </Form.Field>
          <PlayerList teamId={currentTeam ? currentTeam.value : 1} />
        </Form>
      </Card>
    );
  }
}

const clubQuery = graphql(ClubQuery, { name: 'clubs' });

const categoryTeamsQuery = graphql(TeamQuery, {
  name: 'teams',
  options: ({ match }) => ({
    variables: {
      category: match.params.category
    }
  })
});
const form = reduxForm({
  form: formName
});

const mapStateToProps = state => ({
  currentTeam: selector(state, 'teamName')
});

const connector = connect(mapStateToProps, null);
export default compose(clubQuery, categoryTeamsQuery, connector, form)(AddTeam);
