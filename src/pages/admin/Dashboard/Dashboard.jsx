import MenuOpen from "@mui/icons-material/MenuOpen";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = React.useState(true);
  const location = useLocation();

  const handleDashboardNavigation = () => {
    setOpen(!open);
  };

  return (
    <div className="relative bg-[#f5f6fa] overflow-hidden max-h-screen">
      <header
        className={`${
          open === true ? "left-60" : "left-0"
        } fixed right-0 top-0  bg-[#f5f6fa] py-3 px-4 h-16 flex items-center z-50`}
      >
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="">
              <IconButton
                onClick={() => handleDashboardNavigation()}
                size="large"
              >
                <MenuOpen fontSize="inherit" />
              </IconButton>
            </div>
            <div className="text-lg font-bold lg:block hidden">
              <h2>Dashboard</h2>
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`${
          open === true ? "block" : "hidden"
        } fixed inset-y-0 left-0 bg-[#273c75] shadow-md max-h-screen w-60 text-white`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex-grow">
            <div className="px-4 py-6 text-center border-b">
              <Link to="/" className="text-xl font-bold leading-none">
                <span className="text-[#DB2777]">OnLine</span> Academy
              </Link>
            </div>
            <div className="p-4">
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/admin/dashboard"
                    className={`flex items-center ${
                      location.pathname === "/admin/dashboard"
                        ? "bg-white text-gray-800 font-bold"
                        : "hover:bg-gray-200 hover:text-gray-800"
                    } rounded-xl text-sm py-3 px-4`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="text-lg mr-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                    </svg>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/courses"
                    className={`flex ${
                      location.pathname === "/admin/dashboard/courses"
                        ? "bg-white text-gray-800 font-bold"
                        : "hover:bg-gray-200 hover:text-gray-800"
                    }  rounded-xl text-sm py-3 px-4`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="text-lg mr-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
                    </svg>
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/enrolled-users"
                    className={`flex ${
                      location.pathname === "/admin/dashboard/enrolled-users"
                        ? "bg-white text-gray-800 font-bold"
                        : "hover:bg-gray-200 hover:text-gray-800"
                    } rounded-xl text-sm py-3 px-4`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="text-lg mr-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                    </svg>
                    Enrolled Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/all-users"
                    className={`flex ${
                      location.pathname === "/admin/dashboard/all-users"
                        ? "bg-white text-gray-800 font-bold"
                        : "hover:bg-gray-200 hover:text-gray-800"
                    } rounded-xl text-sm py-3 px-4`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="text-lg mr-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                    All Users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Link to="/" className="p-4 hover:bg-gray-200 hover:text-gray-800">
            <button
              type="button"
              className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className=""
                viewBox="0 0 16 16"
              >
                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </button>{" "}
            <span className="font-bold text-sm ml-2">Go to home page</span>
          </Link>
        </div>
      </aside>

      <main
        className={`${
          open === true ? "ml-60" : null
        } pt-16 max-h-screen overflow-auto  h-[100vh]`}
      >
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
