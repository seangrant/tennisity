import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form, Dropdown } from 'semantic-ui-react';
import Select from 'react-select';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import gql from 'graphql-tag';

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

const renderSelect = st => {
  const { input, name } = st;
  console.log({ st });
  return (
    <Dropdown
      {...input}
      name={name}
      options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
      onChange={input.onChange}
    />
  );
};
const SimpleForm = ({ data: { allClubs = [] } } = {}) => {
  console.log({ allClubs });

  return (
    // const { handleSubmit, pristine, reset, submitting } = props;
    <Form>
      <Form.Field>
        <label htmlFor="teamName">Team Name</label>
        <Field
          id="club"
          name="club"
          component="input"
          type="text"
          placeholder="Club Name"
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="teamName">Club Name</label>
        <Field
          id="teamName"
          name="teamName"
          component={renderSelect}
          type="text"
          placeholder="Team Name"
        />
      </Form.Field>
    </Form>
  );
};

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
