import React from "react";
import { FaTasks, FaTrophy } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { NavLink, Outlet } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import useRole from "../../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  // console.log(role);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <IoHomeOutline size="20px" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {/* List item */}
            {role.role === "creator" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add-Contest"
                    to="/dashboard/add-contest"
                  >
                    <IoIosAddCircleOutline size="20px" />
                    <span className="is-drawer-close:hidden">Add Contest</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My-Created-Contests"
                    to="/dashboard/my-created-contests"
                  >
                    <FaTrophy size="20px" />
                    <span className="is-drawer-close:hidden">
                      My Created Contests
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {role.role === "admin" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Users"
                    to="/dashboard/user-management"
                  >
                    <MdOutlineManageAccounts size="20px" />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Contest"
                    to="/dashboard/contest-management"
                  >
                    <FaTasks size="20px" />
                    <span className="is-drawer-close:hidden">
                      Manage Contests
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
