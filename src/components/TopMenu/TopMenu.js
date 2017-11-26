import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const TopMenu = ({ isAuthenticated }) => (
  <Menu secondary>
    <Menu.Item>
      <Link to="/">Home</Link>
    </Menu.Item>
    {isAuthenticated ? (
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
        <Menu.Item>
          <Link to="/login">Logout</Link>
        </Menu.Item>
      </Menu.Menu>
    )}
  </Menu>
);

TopMenu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = ({ user: { isAuthenticated } }) => ({
  isAuthenticated
});

export default connect(mapStateToProps)(TopMenu);
