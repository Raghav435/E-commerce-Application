import {
  GET_PROFILE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./Auth.type";

let user = JSON.parse(localStorage.getItem("User")) || [];
const initialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        issError: false,
        user: null,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        issError: false,
        user: payload,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        issError: true,
        user: null,
      };
    }
    case SIGNUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: payload,
      };
    }
    case SIGNUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        issError: true,
        user: null,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default: {
      return {
        state,
      };
    }
  }
};
