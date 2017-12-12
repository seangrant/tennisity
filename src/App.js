import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Routes from './components/Routes/Routes';
import TopMenu from './components/TopMenu/TopMenu';

import { userLoggedIn } from './components/User/actionCreators';
import { AppContainer, PageBlock } from './components/StyleGuide';

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
      <AppContainer>
        <div className="ui">
          <PageBlock>
            <TopMenu />
            <Routes />
          </PageBlock>
        </div>
      </AppContainer>
    );
  }
}

const mapDispatchToProps = {
  login: userLoggedIn
};

export default withRouter(connect(null, mapDispatchToProps)(App));
