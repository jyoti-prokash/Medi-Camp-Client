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
import AddCamp from "../Pages/adminPage/addCamp";
import ManageRegistered from "../Pages/adminPage/ManageRegistered";
import AllUsers from "../Pages/adminPage/AllUsers";



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
        path: "availableCamp",
        element: <AvailableCamp></AvailableCamp>,
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
        path: '/dashboard/profile',
      },
      {
        path: '/dashboard/addCamp',
        element: <AddCamp></AddCamp>
      },
      {
        path: '/dashboard/manageCamp',
        element: <ManageCamp></ManageCamp>
      },
      {
        path: '/dashboard/manageRegistered',
        element: <ManageRegistered></ManageRegistered>
      },
      {
        path: '/dashboard/allUsers',
        element: <AllUsers></AllUsers>
      }
    ]
  },
]);

export default router;