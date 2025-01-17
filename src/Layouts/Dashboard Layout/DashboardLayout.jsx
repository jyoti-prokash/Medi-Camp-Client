import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();
  return (
    <div className="flex gap-5">
      <div>
        <ul className="menu bg-base-200 text-base-content min-h-full lg:w-80 p-4">
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
                <NavLink to="/dashboard/allUsers">
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/profile">User Profile</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
