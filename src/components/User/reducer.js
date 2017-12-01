export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_SIGNED_UP = 'USER_SIGNED_UP';
export const USER_CONFIRMED = 'USER_CONFIRMED';
const initialState = {
  isAuthenticated: false,
  isConfirmed: false,
  requiresConfirmation: false
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true
      };
    }
    case USER_LOGGED_OUT: {
      return {
        ...state,
        isAuthenticated: false
      };
    }
    case USER_SIGNED_UP: {
      return {
        ...state,
        user: action.payload,
        requiresConfirmation: true
      };
    }
    case USER_CONFIRMED: {
      return {
        ...state,
        isConfirmed: true
      };
    }
    default:
      return state;
  }
};
export default userReducer;
