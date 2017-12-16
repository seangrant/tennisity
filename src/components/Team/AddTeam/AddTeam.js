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
    }).isRequired
  };

  renderSelect = ({ input, clubs }) => {
    const options = clubs.map(club => ({
      value: club.code,
      label: club.name
    }));

    return (
      <Select value={input.value} options={options} onChange={input.onChange} />
    );
  };

  render() {
    console.log({ props: this.props });
    const { clubs: { allClubs = [] }, teams: { teams } } = this.props;

    console.log({ allClubs, teams });
    return (
      <Card>
        <Form>
          <Form.Field>
            <label htmlFor="teamName">Team Name</label>
            <Field
              id="club"
              name="club"
              component={this.renderSelect}
              type="text"
              placeholder="Club Name"
              clubs={allClubs}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="teamName">Club Name</label>
            <Field
              id="teamName"
              name="teamName"
              component="input"
              type="text"
              placeholder="Team Name"
            />
          </Form.Field>
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

export default compose(clubQuery, categoryTeamsQuery, form)(AddTeam);
