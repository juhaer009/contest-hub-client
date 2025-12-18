import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/HomePages/Home";
import AllContests from "../pages/HomePages/AllContests";
import AuthLayout from "../layouts/AuthLayout";
import LogIn from "../pages/AuthPages/LogIn";
import Register from "../pages/AuthPages/Register";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import AddContest from "../pages/DashboardPages/AddContest";
import MyCreatedContests from "../pages/DashboardPages/MyCreatedContests";
import ContestDetails from "../pages/HomePages/ContestDetails";
import PrivateRoute from "../Provider/PrivateRoute";
import UpdateContest from "../pages/DashboardPages/UpdateContest";
import UserManagement from "../pages/DashboardPages/UserManagement";
import ContestManagement from "../pages/DashboardPages/ContestManagement";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allcontests",
        Component: AllContests,
      },
      {
        path: "/contest-details/:id",
        element: (
          <PrivateRoute>
            <ContestDetails></ContestDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: LogIn,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "/dashboard/add-contest",
        Component: AddContest,
      },
      {
        path: "/dashboard/my-created-contests",
        Component: MyCreatedContests,
      },
      {
        path: "/dashboard/update-contest/:id",
        Component: UpdateContest,
      },
      {
        path: "/dashboard/user-management",
        Component: UserManagement,
      },
      {
        path: "/dashboard/contest-management",
        Component: ContestManagement,
      },
    ],
  },
]);

export default router;
