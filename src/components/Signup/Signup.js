import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignupForm from './SignupForm/SignupForm';
// import { login } from './actionCreators';

class LoginPage extends Component {
  // static propTypes = {
  //   login: PropTypes.func.isRequired
  // };
  onSubmit = () => {
    // this.props.login(credentials);
  };

  onLogout = () => {};
  render() {
    return (
      <div>
        <h1>Login</h1>
        <SignupForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default withRouter(connect(null, {})(LoginPage));
