import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import InlineError from '../../Messages/InlineError';

class SignupForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  state = {
    data: {
      confirmationCode: ''
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
    if (Object.keys(errors).length === 0) {
      this.props.onSubmit(data);
    }
  };

  validate = data => {
    const errors = {};

    if (!data.confirmationCode) errors.password = 'Confirmation code not set';

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to={'/'} />;
    }

    return (
      <Form noValidate loading={loading}>
        <Form.Field error={!!errors.confirmationCode}>
          <label htmlFor="confirmationCode">Confirmation Code</label>
          <input
            id="confirmationCode"
            name="confirmationCode"
            placeholder="123456"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Button primary onClick={this.onSubmit}>
          Confirm
        </Button>
      </Form>
    );
  }
}
const mapStateToProps = ({ user: { isAuthenticated } }) => ({
  isAuthenticated
});
export default withRouter(connect(mapStateToProps)(SignupForm));
