import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config from '../config';

const getUserToken = currentUser =>
  new Promise((resolve, reject) => {
    currentUser.getSession((err, session) => {
      if (err) {
        reject(err);
      }
      resolve('FFF');
      // resolve(session.getIdToken().getJwtToken());
    });
  });

const getCurrentUser = () => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  });
  return userPool.getCurrentUser();
};

export const authUser = async () => {
  const currentUser = getCurrentUser();
  if (currentUser === null) {
    return false;
  }
  await getUserToken(currentUser);
  return true;
};

export const signOutUser = () => {
  const currentUser = getCurrentUser();
  if (currentUser !== null) {
    currentUser.signOut();
  }
};
