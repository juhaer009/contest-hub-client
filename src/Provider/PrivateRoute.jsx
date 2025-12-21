import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";
import Loading from "../components/Loading";


const PrivateRoute = ({ children }) => {
  const location = useLocation();
  // console.log(location)

  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth"></Navigate>;
};

export default PrivateRoute;
