import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

const Home = ({ isAuthenticated }) =>
  isAuthenticated ? <div>Home</div> : <Redirect to={'/login'} />;

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = ({ user: { isAuthenticated } }) => ({
  isAuthenticated
});

export default withRouter(connect(mapStateToProps)(Home));
