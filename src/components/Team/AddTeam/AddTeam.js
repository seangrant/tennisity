import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form, Dropdown } from 'semantic-ui-react';
// import Select from 'react-select';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

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

class SimpleForm extends Component {
  renderSelect = ({ input, clubs }) => {
    const options = clubs.map(club => ({
      value: club.code,
      label: club.name
    }));

    return (
      <Dropdown
        {...input}
        name={input.name}
        options={options}
        onChange={input.onChange}
      />
    );
  };

  render() {
    const { data: { allClubs = [] } } = this.props;
    console.log(allClubs);
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

const mapStateToProps = (state, other) => {
  const club = selector(state, 'club');
  console.log({ state, other });
  return {
    club
  };
};

const connector = connect(mapStateToProps);
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

export default connector(graphConnector(form(SimpleForm)));
