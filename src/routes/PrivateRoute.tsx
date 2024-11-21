import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessTokenFromCookie } from "../utils/cookies-actions/user.cookies";
import constantPaths from "./constantPaths";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = getAccessTokenFromCookie(); // Retrieve token from storage

  return token ? children : <Navigate to={constantPaths.SIGN_IN} />;
};

export default PrivateRoute;
