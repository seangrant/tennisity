import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';
import { signOutUser } from '../../libs/awsUtils';
import config from '../../config';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGGED_OUT,
  USER_SIGNED_UP,
  USER_CONFIRMED
} from './reducer';

export const userLoggedIn = () => ({
  type: USER_LOGIN_SUCCESS
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const logout = () => {
  signOutUser();
  return userLoggedOut();
};

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
    dispatch(userLoggedIn(user));
  });

export const userSignedUp = user => ({
  type: USER_SIGNED_UP,
  payload: user
});

export const userConfirmed = user => ({
  type: USER_CONFIRMED,
  payload: user
});

export const performSignup = ({ email, password }) => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  });

  return new Promise((resolve, reject) =>
    userPool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result.user);
    })
  );
};

export const authenticate = (user, email, password) => {
  const authenticationData = {
    Username: email,
    Password: password
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  return new Promise((resolve, reject) =>
    user.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result),
      onFailure: err => reject(err)
    })
  );
};

export const signup = credentials => dispatch =>
  performSignup(credentials).then(user => {
    dispatch(userSignedUp(user));
  });

export const confirm = confirmationCode => (dispatch, getState) => {
  const { user: { user } } = getState();
  return new Promise((resolve, reject) =>
    user.confirmRegistration(confirmationCode, true, err => {
      if (err) {
        reject(err);
        return;
      }
      dispatch(userConfirmed(user));
    })
  );
};
