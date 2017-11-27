import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignupForm from './SignupForm/SignupForm';
import { signup, confirm } from '../actionCreators';
import ConfirmationForm from './ConfirmationForm/ConfirmationForm';

class LoginPage extends Component {
  static propTypes = {
    signupUser: PropTypes.func.isRequired,
    confirmUser: PropTypes.func.isRequired
  };
  onSubmitSignup = credentials => {
    this.props.signupUser(credentials);
  };

  onSubmitConfirm = (user, code) => {
    this.props.confirmUser(user, code);
  };
  render() {
    return (
      <div>
        <h1>Login</h1>
        <SignupForm onSubmit={this.onSubmitSignup} />
        <ConfirmationForm onSubmit={this.onSubmitConfirm} />
      </div>
    );
  }
}

export default withRouter(
  connect(null, { signupUser: signup, confirmUser: confirm })(LoginPage)
);
