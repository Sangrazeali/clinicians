import { useAppContext } from ".";
import { FORGET_PASS } from "../utils/networks/ApiEndPoints";
import { ApiRequest } from "../utils/networks/ApiRequests";

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


export const useUserActions = ()=>{
  const {state,dispatch} = useAppContext();
  
   const forgetPassword = async (email: string) => {
    console.log(`${process.env.REACT_APP_API_INSTANCE}${FORGET_PASS}`,);
    try {
        const response = await ApiRequest().request({
            method: "POST",
            url: `${FORGET_PASS}`,
            data: {
                email,
            },
        });
        console.log(response);
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'FOREGOT_PASSWORD', payload: response.data });
    } catch (err: any | string) {
        dispatch({ type: 'SET_ERROR', payload: err.message });
    }

}

return {forgetPassword}
}