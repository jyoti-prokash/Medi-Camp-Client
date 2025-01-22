import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register/Register";
import AvailableCamp from "../Pages/Available Camp/AvailableCamp";
import PrivetRoute from "./PrivetRoute";
import DashboardLayout from "../Layouts/Dashboard Layout/DashboardLayout";
import ManageCamp from "../Pages/adminPage/ManageCamp";
import ManageRegistered from "../Pages/adminPage/ManageRegistered";
import AllUsers from "../Pages/adminPage/AllUsers";
import AdminRoute from "./AdminRoute";
import AddCamp from "../Pages/adminPage/AddCamp";
import CampDetails from "../Pages/CampDetails/CampDetails";
import RegisteredCamps from "../Pages/ParticipantPage/RegisteredCamps";
import Profile from "../Shared/Profile/Profile";
import Payment from "../Pages/ParticipantPage/Payment";
import PaymentHistory from "../Pages/ParticipantPage/PaymentHistory";
import Analytics from "../Pages/ParticipantPage/Analytics";
import UserProfile from "../Pages/ParticipantPage/UserProfile";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/availableCamp",
        element: <AvailableCamp></AvailableCamp>,
      },
      {
        path: "/campDetails/:id",
        element: (
          <PrivetRoute>
            <CampDetails></CampDetails>
          </PrivetRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout></DashboardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "/dashboard/UserProfile",
        element: (
          <PrivetRoute>
            <UserProfile></UserProfile>
          </PrivetRoute>
        ),
      },
      // user route
      {
        path: "/dashboard/analytics",
        element: (
          <PrivetRoute>
            <Analytics></Analytics>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/registeredCamp",
        element: (
          <PrivetRoute>
            <RegisteredCamps></RegisteredCamps>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivetRoute>
            <Payment></Payment>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/paymentHistory",
        element: (
          <PrivetRoute>
            <PaymentHistory />
          </PrivetRoute>
        ),
      },
      // admin route
      {
        path: "/dashboard/AdminProfile",
        element: (
          <AdminRoute>
            <Profile></Profile>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addCamp",
        element: (
          <AdminRoute>
            <AddCamp></AddCamp>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageCamp",
        element: (
          <AdminRoute>
            <ManageCamp></ManageCamp>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageRegistered",
        element: (
          <AdminRoute>
            <ManageRegistered></ManageRegistered>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;