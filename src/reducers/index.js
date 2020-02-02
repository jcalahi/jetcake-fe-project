import { ActionTypes } from '../actions/types';

const initialState = {
  authUser: null,
  confirmedEmail: null,
  message: null,
  isLoading: false,
  isAuthenticated: false,
  signedupUser: null,
  userSession: null,
  postSuccess: false,
  postFailed: null,
  userProfile: {
    address: '',
    birthdate: '',
    phonenumber: '',
    question1: '',
    question2: '',
    question3: ''
  }
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
        signedupUser: action.payload
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
    case ActionTypes.SET_PROFILE_FIELD:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          [action.payload.fieldName]: action.payload.value
        }
      };
    case ActionTypes.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
