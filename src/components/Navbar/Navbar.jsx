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
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <img className="w-18 h-18" src={logo} alt="logo" />
        <a className="btn btn-ghost text-xl text-secondary">Contest Hub</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
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
              <div className="w-10 rounded-full">
                <img src={user.photoURL} alt="profile" />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-40 p-2 shadow"
            >
              <li>
                <NavLink to="/profile">My Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <button onClick={handleLogOut}>Log Out</button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/auth" className="btn btn-primary">
            Log In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
