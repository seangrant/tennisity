import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Select from 'react-select';
import { graphql } from 'react-apollo';
// import { connect } from 'react-redux';

import gql from 'graphql-tag';

import { Card } from '../../StyleGuide';

const formName = 'addTeamForm';
const selector = formValueSelector(formName);

const ClubQuery = gql`
  query ClubQuery($limit: Int!, $startsWith: String!) {
    allClubs(limit: $limit, startsWith: $startsWith) {
      name
      code
    }
  }
`;

class AddTeam extends Component {
  renderSelect = ({ input, clubs }) => {
    const options = clubs.map(club => ({
      value: club.code,
      label: club.name
    }));
    console.log({ input });
    const change = args => {
      console.log({ args });
      input.onChange(args);
    };
    return (
      <Select value={input.value} options={options} onChange={input.onChange} />
    );
  };

  render() {
    console.log({ props: this.props });
    const { data: { allClubs = [] } } = this.props;
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

const graphConnector = graphql(ClubQuery, {
  options: state => ({
    variables: {
      limit: 32,
      startsWith: selector(state, 'club') || ''
    }
  })
});
const form = reduxForm({
  form: formName
});

export default graphConnector(form(AddTeam));
