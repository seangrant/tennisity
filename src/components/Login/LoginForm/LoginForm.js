import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import validator from 'validator';
import InlineError from '../../Messages/InlineError';

class LoginForm extends Component {
  static propTypes = {
    // onSubmit: PropTypes.func.isRequired
  };

  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = ({ target: { name, value } }) =>
    this.setState({
      data: { ...this.state.data, [name]: value }
    });

  onSubmit = () => {
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
  };

  validate = data => {
    const errors = {};
    if (!validator.isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = 'Password not set';
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form noValidate loading={loading}>
        {errors &&
          errors.global && (
            <Message negative>
              <Message.Header>Oops, Something went wrong</Message.Header>
              {errors.global}
            </Message>
          )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary onClick={this.onSubmit}>
          Login
        </Button>
      </Form>
    );
  }
}
export default LoginForm;
