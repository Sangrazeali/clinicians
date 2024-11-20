//ENVIRONMENTS
import { getAccessTokenFromCookie } from "../cookies-actions/user.cookies";

//AXIOS
import axios from "axios";

export const ApiRequest = () => {
  const request = axios.create({
    baseURL: process.env.REACT_APP_API_INSTANCE,
    headers: {
      Authorization: `Bearer ${getAccessTokenFromCookie() || ""}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    responseType: "json",
    socketPath: null,
    withCredentials: false,
  });

  request.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any) => {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        return;
      }

      if (error.response.status === 403) {
        return;
      }

      return Promise.reject(error.response);
    }
  );

  return request;
};
