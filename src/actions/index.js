import axios from 'axios';
import { ActionTypes } from './types';
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
const POST_API = process.env.REACT_APP_API_POST;
const userPool = new CognitoUserPool(POOL_DATA);
/**
 * Sign Up Action
 */
export const signup = (formData) => {
  const attributeList = [];
  const nullList = [];

  const emailAttribute = {
    Name: 'email',
    Value: formData.email
  };

  attributeList.push(new CognitoUserAttribute(emailAttribute));

  return (dispatch) => {
    // clear error messages
    dispatch({ type: ActionTypes.CLEAR_MESSAGE });
    dispatch({ type: ActionTypes.LOADING_IN_PROGRESS });
    userPool.signUp(formData.email, formData.password, attributeList, nullList, (err, result) => {
      if (err) {
        dispatch({
          type: ActionTypes.SIGN_UP_ERROR,
          payload: err
        });
      } else {
        dispatch({
          type: ActionTypes.SIGN_UP_SUCCESS,
          payload: result?.user
        })
      }
      dispatch({ type: ActionTypes.LOADING_COMPLETE });
    });
  }
};
/**
 * Confirm Form Action
 */
export const confirmSignup = (formData) => {
  const userData = {
    Username: formData.email,
    Pool: userPool
  };
  const cognitoUser = new CognitoUser(userData);

  return (dispatch) => {
    // clear error messages
    dispatch({ type: ActionTypes.CLEAR_MESSAGE });
    dispatch({ type: ActionTypes.LOADING_IN_PROGRESS });
    cognitoUser.confirmRegistration(formData.code, true, (err, result) => {
      if (err) {
        dispatch({ type: ActionTypes.LOADING_COMPLETE });
        dispatch({
          type: ActionTypes.CONFIRM_SIGN_UP_ERROR,
          payload: err
        });
      } else {
        dispatch({ type: ActionTypes.LOADING_COMPLETE });
        dispatch({
          type: ActionTypes.CONFIRM_SIGN_UP_SUCCESS,
          payload: result
        });
      }
    });
  };
};
/**
 * Login Action
 */
export const login = (formData) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_MESSAGE });
    dispatch({ type: ActionTypes.LOADING_IN_PROGRESS });

    const authDetails = new AuthenticationDetails({ Username: formData.email, Password: formData.password });
    const userData = {
      Username: formData.email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authDetails, {
      onSuccess (result) {
        dispatch({ type: ActionTypes.LOADING_COMPLETE });
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: result
        });
      },
      onFailure (err) {
        dispatch({ type: ActionTypes.LOADING_COMPLETE });
        dispatch({
          type: ActionTypes.LOGIN_ERROR,
          payload: err
        });
      }
    });
  }
}
/**
 * Check Authentication
 */
export const checkAuth = () => {
  return (dispatch) => {
    const user = userPool.getCurrentUser();
    if (user !== null) {
      dispatch({ type: ActionTypes.LOADING_IN_PROGRESS });
      user.getSession((err, session) => {
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
        }
      });
    }
  };
};
 /**
  * Logout
  */
 export const logout = () => {
   return (dispatch) => {
     userPool.getCurrentUser().signOut();
     dispatch({ type: ActionTypes.LOG_OUT, payload: false });
   };
 };
/**
 * Update Profile
 */
export const updateProfile = () => {
  return (dispatch) => {
    userPool.getCurrentUser().getSession((err, session) => {
      if (err) {
        return;
      }
      const data = {
        address: 'raspberry'
      };
      axios.post('https://2ogmjklhjb.execute-api.ap-southeast-1.amazonaws.com/dev/jcake', data, {
        headers: new Headers({
          Authorization: session.idToken.jwtToken
        })
      }).then(res => console.log(res)); 
    });
  };
};