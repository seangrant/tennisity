import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Routes from './components/Routes/Routes';
import TopMenu from './components/TopMenu/TopMenu';

import { userLoggedIn } from './components/User/actionCreators';

import { authUser } from './libs/awsUtils';

class App extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };
  async componentDidMount() {
    if (await authUser()) {
      this.props.login();
    }
  }
  render() {
    return (
      <div className="ui container">
        <TopMenu />
        <Routes />
      </div>
    );
  }
}

const mapDispatchToProps = {
  login: userLoggedIn
};

export default withRouter(connect(null, mapDispatchToProps)(App));
