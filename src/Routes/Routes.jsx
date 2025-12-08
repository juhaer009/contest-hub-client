import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/HomePages/Home";
import AllContests from "../pages/HomePages/AllContests";
import AuthLayout from "../layouts/AuthLayout";
import LogIn from "../pages/AuthPages/LogIn";
import Register from "../pages/AuthPages/Register";

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
]);

export default router;
