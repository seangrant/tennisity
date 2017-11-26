export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
const initialState = {
  isAuthenticated: false
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      const { accessToken } = action.payload;

      return {
        ...state,
        isAuthenticated: Boolean(accessToken)
      };
    }
    case USER_LOGGED_OUT:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
export default userReducer;
