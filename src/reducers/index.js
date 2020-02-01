import { ActionTypes } from '../actions/types';

const initialState = {
  authUser: null,
  isAuthenticated: null,
  message: null,
  user: null,
  confirmedEmail: null,
  isLoading: false,
  userSession: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authUser: action.payload
      };
    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        message: action.payload.message
      };
    case ActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case ActionTypes.CONFIRM_SIGN_UP_ERROR: 
    case ActionTypes.SIGN_UP_ERROR:
      return {
        ...state,
        message: action.payload.message
      }
    case ActionTypes.CONFIRM_SIGN_UP_SUCCESS:
      return {
        ...state,
        confirmedEmail: action.payload
      };
    case ActionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        message: ''
      };
    case ActionTypes.LOADING_IN_PROGRESS: 
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.LOADING_COMPLETE:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        userSession: {
          sub: action.payload.attrs[0].Value,
          email: action.payload.attrs[2].Value
        }
      };
    case ActionTypes.NOT_AUTHENTICATED:
      return {
        ...state,
        userSession: null
      };
    default:
      return state;
  }
}
