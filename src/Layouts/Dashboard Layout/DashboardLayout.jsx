import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();
  const {logOut} = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="flex flex-col lg:flex-row lg:min-h-screen">
      <div>
        <ul className="menu bg-[#148980] text-base-content min-h-screen lg:w-80 p-4 relative">
          {/* Sidebar content here */}
          {/* admin side */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/profile">Admin Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addCamp">Add Camp</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageCamp">Manage Camp</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageRegistered">
                  Manage Registered Camps
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">All Users</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/analytics">Analytics</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/registeredCamp">
                  Registered Camps
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </>
          )}
        </ul>
        <div className="absolute bottom-5 left-2">
          <button
            onClick={handleLogout}
            className="btn btn-outline text-white font-bold"
          >
            LogOut
          </button>
        </div>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
