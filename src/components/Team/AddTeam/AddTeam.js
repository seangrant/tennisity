import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Select from 'react-select';
import { graphql } from 'react-apollo';

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

const renderSelect = ({ input, name }) => (
  <Select
    name={name}
    options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
    onChange={input.onChange}
  />
);
const SimpleForm = ({ data } = {}) => {
  console.log({ data });
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
const graphConnector = graphql(ClubQuery, {
  options: () => ({
    variables: {
      $limit: 6,
      $startsWith: 'E'
    }
  })
});
const form = reduxForm({
  form: formName
});

export default graphConnector(form(SimpleForm));
