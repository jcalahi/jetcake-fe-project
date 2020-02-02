import { ActionTypes } from '../actions/types';

const initialState = {
  authUser: null,
  confirmedEmail: null,
  message: null,
  isLoading: false,
  isAuthenticated: false,
  user: null,
  userSession: null,
  postSuccess: false,
  postFailed: null,
  userProfile: null
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
      };
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
        postSuccess: false,
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
    case ActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        postSuccess: action.payload
      };
    case ActionTypes.UPDATE_PROFILE_FAILED:
      return {
        ...state,
        postFailed: action.payload
      };
    case ActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload
      };
    case ActionTypes.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
