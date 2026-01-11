import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/HomePages/Home";
import AllContests from "../pages/HomePages/AllContests";
import About from "../pages/HomePages/About";
import Contacts from "../pages/HomePages/Contacts";
import MyProfile from "../pages/HomePages/MyProfile";
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
import AdminRoute from "../Provider/AdminRoute";
import MakePayment from "../pages/DashboardPages/Payment/MakePayment";
import PaymentSuccess from "../pages/DashboardPages/Payment/PaymentSuccess";
import PaymentCanceled from "../pages/DashboardPages/Payment/PaymentCanceled";
import MyParticipatedContests from "../pages/DashboardPages/MyParticipatedContests";
import DashboardMyProfile from "../pages/DashboardPages/MyProfile";
import SubmittedTask from "../pages/DashboardPages/SubmittedTask";

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
        path: "/about",
        Component: About,
      },
      {
        path: "/contacts",
        Component: Contacts,
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <AddContest></AddContest>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-created-contests",
        element: (
          <PrivateRoute>
            <MyCreatedContests></MyCreatedContests>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-contest/:id",
        element: (
          <PrivateRoute>
            <UpdateContest></UpdateContest>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/user-management",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/contest-management",
        element: (
          <AdminRoute>
            <ContestManagement></ContestManagement>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/make-payment/:contestId",
        // Component: MakePayment,
        element: (
          <PrivateRoute>
            <MakePayment></MakePayment>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/dashboard/payment-canceled",
        Component: PaymentCanceled,
      },
      {
        path: "/dashboard/my-participated-contests",
        element: (
          <PrivateRoute>
            <MyParticipatedContests></MyParticipatedContests>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-profile",
        element: (
          <PrivateRoute>
            <DashboardMyProfile></DashboardMyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/submitted-task",
        element: (
          <PrivateRoute>
            <SubmittedTask></SubmittedTask>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
