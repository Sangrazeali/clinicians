// reducer.ts
import { State, Action } from './actions';

export const initialState: State = {
  user: null,
  loadingStates: {},
  error: null,
  Forget_pass: null,
  Reset_Password: null,
  profile:null,
  failedToken:false,
  product:null

};

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loadingStates: { ...state.loadingStates, [action.payload.key]: action.payload.value },
      };
    case 'FORGOT_PASSWORD':
      return { ...state, Forget_pass: action.payload, error: null };
    case 'RESET_PASSWORD':
      return { ...state, Reset_Password: action.payload, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, error: null };
    case 'PROFILE_SUCCESS':
      return { ...state, profile: action.payload, error: null };
    case 'PRODUCT_SUCCESS':
      return { ...state, product: action.payload, error: null };
    case 'FAILED_TOKEN':
      return { ...state, failedToken: action.payload, error: null };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};