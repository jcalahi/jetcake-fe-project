import axios from 'axios';
import { ActionTypes } from './types';
import history from '../history';

import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';

const POOL_DATA = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID
};
const userPool = new CognitoUserPool(POOL_DATA);
/**
 * Sign Up Action
 */
export const signup = formData => {
  const attributeList = [];
  const nullList = [];

  const emailAttribute = {
    Name: 'email',
    Value: formData.email
  };

  attributeList.push(new CognitoUserAttribute(emailAttribute));

  return dispatch => {
    // clear error messages
    dispatch({ type: ActionTypes.CLEAR_MESSAGE });
    dispatch({ type: ActionTypes.LOADING_IN_PROGRESS });
    userPool.signUp(
      formData.email,
      formData.password,
      attributeList,
      nullList,
      (err, result) => {
        if (err) {
          dispatch({
            type: ActionTypes.SIGN_UP_ERROR,
            payload: err
          });
        } else {
          dispatch({
            type: ActionTypes.SIGN_UP_SUCCESS,
            payload: result.user
          });
        }
        dispatch({ type: ActionTypes.LOADING_COMPLETE });
      }
    );
  };
};
/**
 * Confirm Form Action
 */
export const confirmSignup = formData => {
  const userData = {
    Username: formData.email,
    Pool: userPool
  };
  const cognitoUser = new CognitoUser(userData);
  return dispatch => {
    // clear error messages
    dispatch({ type: ActionTypes.CLEAR_MESSAGE });
    dispatch({ type: ActionTypes.LOADING_IN_PROGRESS });
    // start confirming registration
    cognitoUser.confirmRegistration(formData.code, true, (err, result) => {
      if (err) {
        dispatch({ type: ActionTypes.LOADING_COMPLETE });
        dispatch({
          type: ActionTypes.CONFIRM_SIGN_UP_ERROR,
          payload: err
        });
      } else {
        // login user automatically
        const authDetails = new AuthenticationDetails({
          Username: formData.email,
          Password: formData.password
        });
        cognitoUser.authenticateUser(authDetails, {
          onSuccess(result) {
            dispatch({ type: ActionTypes.LOADING_COMPLETE });
            dispatch({
              type: ActionTypes.LOGIN_SUCCESS,
              payload: result
            });
            history.push('/');
          },
          onFailure(err) {
            dispatch({ type: ActionTypes.LOADING_COMPLETE });
            dispatch({
              type: ActionTypes.LOGIN_ERROR,
              payload: err
            });
          }
        });
      }
    });
  };
};
/**
 * Login Action from home page
 */
export const login = formData => {
  return dispatch => {
    dispatch({ type: ActionTypes.CLEAR_MESSAGE });
    dispatch({ type: ActionTypes.LOADING_IN_PROGRESS });

    const authDetails = new AuthenticationDetails({
      Username: formData.email,
      Password: formData.password
    });
    const userData = {
      Username: formData.email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result) {
        dispatch({ type: ActionTypes.LOADING_COMPLETE });
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: result
        });
        history.push('/');
      },
      onFailure(err) {
        dispatch({ type: ActionTypes.LOADING_COMPLETE });
        dispatch({
          type: ActionTypes.LOGIN_ERROR,
          payload: err
        });
      }
    });
  };
};
/**
 * Check Authentication
 */
export const checkAuth = () => {
  return dispatch => {
    const user = userPool.getCurrentUser();
    if (user !== null) {
      dispatch({ type: ActionTypes.LOADING_IN_PROGRESS });
      user.getSession(async (err, session) => {
        if (err) {
          dispatch({ type: ActionTypes.LOADING_COMPLETE });
          dispatch({
            type: ActionTypes.NOT_AUTHENTICATED,
            payload: err
          });
        } else {
          user.getUserAttributes(function(err, attributes) {
            if (err) {
              // Handle error
            } else {
              dispatch({ type: ActionTypes.LOADING_COMPLETE });
              dispatch({
                type: ActionTypes.IS_AUTHENTICATED,
                payload: {
                  attrs: attributes,
                  isAuthenticated: session.isValid()
                }
              });
            }
          });
          let queryParam = '?accessToken=' + session.accessToken.jwtToken;
          const response = await axios.get(
          `https://2ogmjklhjb.execute-api.ap-southeast-1.amazonaws.com/dev/jcake/profile${queryParam}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: session.idToken.jwtToken
            }
          }
        );
        if (response.status === 200) {
          dispatch({ type: ActionTypes.LOADING_COMPLETE });
          dispatch({
            type: ActionTypes.GET_PROFILE_SUCCESS,
            payload: response.data
          });
        }
        }
      });
    }
  };
};
/**
 * Logout
 */
export const logout = () => {
  return dispatch => {
    userPool.getCurrentUser().signOut();
    dispatch({ type: ActionTypes.LOG_OUT, payload: false });
  };
};
/**
 * Update Profile
 */
export const updateProfile = formData => {
  return dispatch => {
    userPool.getCurrentUser().getSession(async (err, session) => {
      if (err) {
        return;
      }
      dispatch({ type: ActionTypes.LOADING_IN_PROGRESS });
      formData.phonenumber = formData.phonenumber.toString();
      const response = await axios.post(
        'https://2ogmjklhjb.execute-api.ap-southeast-1.amazonaws.com/dev/jcake',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: session.idToken.jwtToken
          }
        }
      );
      dispatch({ type: ActionTypes.LOADING_COMPLETE });
      if (response.status === 200) {
        history.push('/');
      } else {
        dispatch({
          type: ActionTypes.UPDATE_PROFILE_FAILED,
          payload: response.statusText
        });
      }
    });
  };
};
/**
 * Get Profile Data
 */
export const getProfileData = () => {
  return dispatch => {
    userPool.getCurrentUser().getSession(async (err, session) => {
      dispatch({ type: ActionTypes.LOADING_IN_PROGRESS });
      if (err) {
        // do something
        dispatch({ type: ActionTypes.LOADING_COMPLETE });
        console.log('if', err);
      } else {
        let queryParam = '?accessToken=' + session.accessToken.jwtToken;
        const response = await axios.get(
          `https://2ogmjklhjb.execute-api.ap-southeast-1.amazonaws.com/dev/jcake/profile${queryParam}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: session.idToken.jwtToken
            }
          }
        );
        if (response.status === 200) {
          dispatch({ type: ActionTypes.LOADING_COMPLETE });
          dispatch({
            type: ActionTypes.GET_PROFILE_SUCCESS,
            payload: response.data
          });
        }
      }
    });
  };
};
/**
 * Set Profile Field
 */
export const setProfileField = (fieldName, value) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PROFILE_FIELD,
      payload: {
        fieldName,
        value
      }
    });
  }
};