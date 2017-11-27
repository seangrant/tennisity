import {
  AuthenticationDetails,
  CognitoUserPool
} from 'amazon-cognito-identity-js';
import config from '../../config';

export const userSignedUp = user => ({
  type: 'USER_SIGNED_UP',
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

export const signup = credentials => dispatch =>
  performSignup(credentials).then(user => {
    dispatch(userSignedUp(user));
  });

export const confirm = (user, confirmationCode) =>
  new Promise((resolve, reject) =>
    user.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    })
  );

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
