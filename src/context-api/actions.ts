// types.ts
export interface State {
  user: User | null;
  Forget_pass: Forget_Password | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  email: string;
  password: string;
}

export interface Forget_Password {
  email: string;
}



export type Action =
  | { type: 'LOGIN_ATTEMPT'; payload: User }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'FOREGOT_PASSWORD'; payload: Forget_Password }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };
