import { useNavigate } from "react-router-dom";
import { useAppContext } from ".";
import NewPassword from "../pages/auth/NewPassword";
import constantPaths from "../routes/constantPaths";
import { FORGET_PASS, GET_DASHBOARD, GET_PRODUCTS, POST_MIGRATION, PROFILE, REST_PASS, SIGN_IN } from "../utils/networks/ApiEndPoints";
import { ApiRequest } from "../utils/networks/ApiRequests";
import { setAccessTokenCookie } from "../utils/cookies-actions/user.cookies";

export interface State {
  user: User | null;
  Forget_pass: Forget_Password | null;
  loadingStates: { [key: string]: boolean };
  error: string | null;
  Reset_Password: Reset_Password | null;
  profile: any,
  failedToken: boolean,
  product: any,
  post_migration: any,
  dashboard_data: any
}

export interface User {
  email: string;
  password: string;
}

export interface Forget_Password {
  email: string;
}

export interface Reset_Password {
  email: string;
  token: string;
  newPassword: string;
}

export interface Profile {
  applicationStatus: "pending" | "approved" | "rejected"; // assuming status is an enum
  balance: number;
  capital: number;
  email: string;
  firstName: string;
  lastName: string;
  nationality: string;
  phone: string;
  profilePicture: string;
  role: "user" | "admin";
  userName: string;
  __v: number;
  _id: string;
}

export interface Failed_Token {
  message?: boolean
}

export type Action =
  | { type: 'SET_LOADING'; payload: { key: string; value: boolean } }
  | { type: 'FORGOT_PASSWORD'; payload: Forget_Password }
  | { type: 'RESET_PASSWORD'; payload: Reset_Password }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'PROFILE_SUCCESS'; payload: any }
  | { type: 'PRODUCT_SUCCESS'; payload: any }
  | { type: 'DASHBOARD_DATA'; payload: any }
  | { type: 'POST_MIGRATION'; payload: any }
  | { type: 'FAILED_TOKEN'; payload: boolean }
  | { type: 'LOGOUT' };

export const useUserActions = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const forgetPassword = async (email: string) => {
    const actionKey = "forgetPasswordLoading";
    try {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: true } });

      const response = await ApiRequest().request({
        method: "POST",
        url: `${FORGET_PASS}`,
        data: { email },
      });

      if (response && response.data) {
        dispatch({ type: "FORGOT_PASSWORD", payload: response.data });
        navigate(`${constantPaths.EMAIL_SENT}`);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: false } });
    }
  };

  const resetPassword = async ({ email, token, newPassword }: Reset_Password) => {
    const actionKey = "resetPasswordLoading";
    try {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: true } });

      const response = await ApiRequest().request({
        method: "POST",
        url: `${REST_PASS}`,
        data: { email, token, newPassword },
      });

      if (response.status == 200) {
        dispatch({ type: "FAILED_TOKEN", payload: false });
        dispatch({ type: "RESET_PASSWORD", payload: response.data });
        navigate(`${constantPaths.SIGN_IN}`, { state: { message: "Congrats, You have successfully reset your password, you can now login with your new password." } });
      }

    } catch (err: any) {
      dispatch({ type: "FAILED_TOKEN", payload: true });
      console.error("error", err);
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: false } });
    }
  };

  const SignIn = async ({ email, password }: User) => {
    const actionKey = "signinLoading";
    try {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: true } });

      const response = await ApiRequest().request({
        method: "POST",
        url: `${SIGN_IN}`,
        data: { email, password },
      });

      if (response && response.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.result });
        if (response.status == 200) {
          const token = response.headers.authorization.replace("Bearer ", "");
          setAccessTokenCookie(token);
          navigate(`${constantPaths.HOME}`);
        }
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: false } });
    }
  };
  const getDashboardData = async () => {
    const actionKey = "dashboardLoading";
    try {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: true } });

      const response = await ApiRequest().request({
        method: "GET",
        url: `${GET_DASHBOARD}`,
      });

      if (response && response.data) {
        dispatch({ type: "DASHBOARD_DATA", payload: response.data.result });
        console.log("response", response)
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: false } });
    }
  };

  const postMigration = async (formData: FormData) => {
    const actionKey = "migrationLoading";
    try {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: true } });

      const response = await ApiRequest().request({
        method: "POST",
        url: `${POST_MIGRATION}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }, // Let the browser set the boundary
      });

      if (response && response.data.success == true) {
        dispatch({ type: "POST_MIGRATION", payload: response.data });
        getDashboardData();
      }
    } catch (err: any) {
      console.error(err);
      console.log(err)
      dispatch({ type: "POST_MIGRATION", payload: err });
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: false } });
    }
  };

  const Profile = async () => {
    const actionKey = "profileLoading";
    try {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: true } });

      const response = await ApiRequest().request({
        method: "GET",
        url: `${PROFILE}`,
      });

      if (response && response.data) {
        dispatch({ type: "PROFILE_SUCCESS", payload: response.data.result });
        // navigate(`${constantPaths.SIGN_IN}`);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: actionKey, value: false } });
    }
  };


  return {
    forgetPassword,
    resetPassword,
    SignIn,
    Profile,
    getDashboardData,
    postMigration,
    loadingStates: state.loadingStates
  };
}