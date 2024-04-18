import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";

type ProtectedRouteProps = {
  children: JSX.Element;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const authToken = useAppSelector((state) => state.loginSlice.authToken);
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;