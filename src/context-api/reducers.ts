import { Forget_Password } from './actions';
// reducer.ts
import { State, Action } from './actions';

export const initialState: State = {
  user: null,
  loading: false,
  error: null,
  Forget_pass: null

};

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FOREGOT_PASSWORD':
      return { ...state, Forget_pass: action.payload, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, error: null };
    case 'LOGOUT':
      return { ...state, user: null };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
