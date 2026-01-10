import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allcontests">All Contests</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contacts">Contacts</NavLink>
      </li>
    </>
  );
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast("You Logged Out Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="navbar-start flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" src={logo} alt="logo" />
            <a className="btn btn-ghost text-lg sm:text-xl text-secondary font-bold hidden sm:block">Contest Hub</a>
            <a className="btn btn-ghost text-base text-secondary font-bold sm:hidden">Hub</a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                data-tip={user.displayName || "Account"}
              >
                <div className="w-8 sm:w-10 rounded-full">
                  <img src={user.photoURL} alt="profile" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-48 sm:w-52 p-2 shadow-lg border"
              >
                <li>
                  <p className="font-semibold text-sm sm:text-base lg:text-xl text-secondary truncate" >{user.displayName}</p>
                </li>
                <li>
                  <NavLink to="/dashboard" className="text-sm sm:text-base">Dashboard</NavLink>
                </li>
                <li>
                  <button onClick={handleLogOut} className="text-sm sm:text-base">Log Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/auth" className="btn btn-primary btn-sm sm:btn-md">
              <span className="hidden sm:inline">Log In</span>
              <span className="sm:hidden">Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
