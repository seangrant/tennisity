import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../User/actionCreators';

const TopMenu = ({ isAuthenticated, userLogout }) => (
  <Menu secondary>
    <Menu.Item>
      <Link to="/">Home</Link>
    </Menu.Item>
    {!isAuthenticated ? (
      <Menu.Menu position="right">
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/signup">Sign up</Link>
        </Menu.Item>
      </Menu.Menu>
    ) : (
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={userLogout} />
      </Menu.Menu>
    )}
  </Menu>
);

TopMenu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userLogout: PropTypes.func.isRequired
};

const mapStateToProps = ({ user: { isAuthenticated } }) => ({
  isAuthenticated
});

const mapDispatchToProps = { userLogout: logout };
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopMenu)
);
