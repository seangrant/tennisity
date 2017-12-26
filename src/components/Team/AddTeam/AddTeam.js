import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import { Card } from '../../StyleGuide';
import ClubQuery from './clubQuery';
import TeamQuery from './teamQuery';
import PlayerQuery from './playerQuery';
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

  // renderPlayers = ({ fields, meta: { error = '' } }) => {
  //   console.log({ fields });
  //   return fields.map((player, index) => {
  //     console.log(player);
  //     return (
  //       <ul>
  //         <PlayerListItem key={index} player={player} />
  //       </ul>
  //     );
  //   });
  // };

  submitForm = team => {
    console.log({ team });
    // this.props.submitExperiment(experiment);
  };

  render() {
    const { handleSubmit } = this.props;
    console.log({ addTeamProps: this.props });
    const {
      clubs: { allClubs = [] },
      teams: { teams = [] },
      teamId
    } = this.props;
    console.log({ teamId });
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
        <Form onSubmit={handleSubmit(this.submitForm)}>
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
          <Form.Field>
            <label htmlFor="name">Club</label>
            <Field
              id="name"
              name="name"
              component="input"
              type="text"
              placeholder="name"
            />
          </Form.Field>
          <FieldArray name="players" component={PlayerList} teamId={teamId} />
          <button type="submit">Add</button>
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

const playerQuery = graphql(PlayerQuery, {
  name: 'players',
  options: ({ teamId }) => ({
    variables: {
      teamId
    },
    skip: true
  })
});

const form = reduxForm({
  form: formName
});

const mapStateToProps = state => {
  const currentTeam = selector(state, 'teamName') || [];
  const teamId = currentTeam.length ? currentTeam[0].Id : 0;
  console.log({ currentTeam });
  return {
    teamId,
    currentTeam,
    initialValues: {
      name: 'fred'
    }
  };
};

const connector = connect(mapStateToProps, null);
export default compose(
  clubQuery,
  categoryTeamsQuery,
  playerQuery,
  connector,
  form
)(AddTeam);
