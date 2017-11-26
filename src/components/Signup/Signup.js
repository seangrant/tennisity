import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Signup = () => <div>Signup</div>;

const mapStateToProps = ({ user: { isAuthenticated } }) => ({
  isAuthenticated
});

export default withRouter(connect(mapStateToProps)(Signup));
