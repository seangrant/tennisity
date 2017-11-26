import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';

import config from '../../config';
import { USER_LOGIN_SUCCESS, USER_LOGGED_OUT } from './reducer';

export const userLoggedIn = user => ({
  type: USER_LOGIN_SUCCESS,
  payload: user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const performLogin = ({ email, password }) => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  });
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authenticationData = { Username: email, Password: password };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  return new Promise((resolve, reject) =>
    user.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result),
      onFailure: err => reject(err)
    })
  );
};

export const login = credentials => dispatch =>
  performLogin(credentials).then(user => {
    console.log({ user });
    dispatch(userLoggedIn(user));
  });
