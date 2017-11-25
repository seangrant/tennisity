import React, { Component } from 'react';

import LoginForm from './LoginForm/LoginForm';

class LoginPage extends Component {
  static propTypes = {};
  onSubmit = () => {};

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

export default LoginPage;
