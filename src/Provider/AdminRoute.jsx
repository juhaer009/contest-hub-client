import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";
import Forbidden from "../components/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (role.role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminRoute;
