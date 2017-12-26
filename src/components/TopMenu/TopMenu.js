import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import { Row, PageBlock, Text, margin, border } from '../StyleGuide';
import { logout } from '../User/actionCreators';

const Header = styled('div')(({ theme }) => ({
  height: theme.row * 47,
  'background-color': theme.colors.darkPrimary,
  margin: margin({ bottom: theme.row * -38 })
}));

const Menu = styled('div')(({ theme }) => ({
  'border-bottom': border({ color: theme.colors.light })
}));

const TopMenu = ({ isAuthenticated, userLogout }) => (
  <Header>
    <Menu>
      <PageBlock>
        <Row rows={8} align="center">
          <Text type="subheading" light raw>
            <RouterLink to="/">Tennisity </RouterLink>
          </Text>
          {!isAuthenticated ? (
            <Row align="center">
              <Text light raw>
                <RouterLink to="/login">Login</RouterLink>
              </Text>
              <Text light raw>
                <RouterLink to="/signup">Sign up</RouterLink>
              </Text>
            </Row>
          ) : (
            <Text light raw onClick={userLogout}>
              Logout
            </Text>
          )}
        </Row>
      </PageBlock>
    </Menu>
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
