import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuthContext();
  // console.log(user,loading);
  if (!loading) {
    return user ? <Outlet /> : <Navigate to={"/login"} />;
  }
};
export default ProtectedRoute;
