import React from "react";
import LogIn from "../pages/AuthPages/LogIn";
import brandImg from "../assets/contesthub.png";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="my-96">
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <img className="w-90 h-96" src={brandImg} alt="" />
        <div className="w-80">
            <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
