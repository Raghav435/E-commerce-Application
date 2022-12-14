import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./Auth.type";

const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

const signupSuccess = (payload) => {
  return {
    type: SIGNUP_SUCCESS,
    payload,
  };
};

const signupFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    error,
  };
};

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const SignupGet = (userData) => (dispatch) => {
  const requestAction = signupRequest();
  dispatch(requestAction);
  axios
    .post("https://ecommerce-backend-app.onrender.com/register", userData)
    .then((res) => {
      const successAction = signupSuccess(res.data);
      // console.log(res.data);
      if (res.data) {
        localStorage.setItem("User", JSON.stringify(res.data));
      }
      dispatch(successAction);
      // console.log(res.data.token);
    })
    .catch((error) => {
      const failureAction = signupFailure(error.message);
      console.log(error);
      dispatch(failureAction);
      return error;
    });
};

export const loginGet = (userData) => (dispatch) => {
  console.log(userData);
  const requestAction = loginRequest();
  dispatch(requestAction);
  axios
    .post("https://ecommerce-backend-app.onrender.com/login", userData)
    .then((res) => {
      if (res.data) {
        localStorage.setItem("User", JSON.stringify(res.data));
      }
      const successAction = loginSuccess(res.data);
      // console.log(res.data);
      dispatch(successAction);
    })
    .catch((err) => {
      const failureAction = loginFailure(err.message);
      console.log(err);
      dispatch(failureAction);
      return err;
    });
};

export const logoutFun = () => (dispatch) => {
  dispatch(logout());
  localStorage.removeItem("User");
  localStorage.removeItem("UserDeta");
  localStorage.removeItem("UserName");
};

export { loginRequest, loginSuccess, loginFailure };
