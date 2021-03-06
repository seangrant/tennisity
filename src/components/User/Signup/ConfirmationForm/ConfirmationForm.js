import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import InlineError from '../../../Messages/InlineError';

class ConfirmationForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isConfirmed: PropTypes.bool.isRequired
  };

  static defaultProps = {
    user: null
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
      this.props.onSubmit(data.confirmationCode);
    }
  };

  validate = data => {
    const errors = {};

    if (!data.confirmationCode) errors.password = 'Confirmation code not set';

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    const { isAuthenticated, isConfirmed } = this.props;

    if (isAuthenticated) {
      return <Redirect to={'/'} />;
    }
    if (isConfirmed) {
      return <Redirect to={'/login'} />;
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
const mapStateToProps = ({ user: { isAuthenticated, user, isConfirmed } }) => ({
  isAuthenticated,
  user,
  isConfirmed
});
export default withRouter(connect(mapStateToProps)(ConfirmationForm));
