import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm/LoginForm';
import { login } from './actionCreators';

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };
  onSubmit = credentials => {
    this.props.login(credentials);
  };

  onLogout = () => {};
  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm onSubmit={this.onSubmit} onLogout={this.onLogout} />
      </div>
    );
  }
}

export default connect(null, { login })(LoginPage);
