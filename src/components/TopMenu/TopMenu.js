import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import { Row, PageBlock, border, Link } from '../StyleGuide';
import { logout } from '../User/actionCreators';

const Header = styled('div')(({ theme }) => ({
  height: theme.row * 7,
  'border-bottom': border({ color: theme.colors.secondary })
}));

const TopMenu = ({ isAuthenticated, userLogout }) => (
  <Header>
    <PageBlock>
      <Row align="center">
        <Row>
          <Link raw>
            <RouterLink to="/">Home</RouterLink>
          </Link>
          <Link raw>
            <RouterLink to="/team/add">Add Team</RouterLink>
          </Link>
        </Row>
        {!isAuthenticated ? (
          <Row>
            <Link raw>
              <RouterLink to="/login">Login</RouterLink>
            </Link>
            <Link raw>
              <RouterLink to="/signup">Sign up</RouterLink>
            </Link>
          </Row>
        ) : (
          <Link raw onClick={userLogout}>
            Logout
          </Link>
        )}
      </Row>
    </PageBlock>
  </Header>
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
