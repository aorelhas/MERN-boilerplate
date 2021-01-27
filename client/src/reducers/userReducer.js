import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/userConstants';

export const userLoginReducer = (state = { authData: null }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, authData: payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
