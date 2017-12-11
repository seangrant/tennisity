import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './components/User/reducer';

export default combineReducers({
  user,
  form
});
