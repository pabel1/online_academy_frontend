import { LocalLibrary, SpaceDashboard } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { IoLogIn } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../feature/auth/authSlice";

const Navbar = () => {
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="shadow-sm">
      <nav className="">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <Link to="/" className="text-md lg:text-2xl font-bold text-gray-700">
            <span className="text-[#DB2777]">OnLine</span> Academy
          </Link>
          <div className="flex space-x-2 lg:space-x-10">
            {/* <Link
              to="/all-courses"
              className="flex items-center space-x-2 text-sm">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#8E4FFB]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </span>
              <span className="text-gray-700 font-bold">All Courses</span>
            </Link> */}
            {auth?.user && (
              <Link
                to="/enrolled/my-course"
                className="flex items-center space-x-1 lg:space-x-2 text-xs lg:text-sm"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#273c75]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </span>
                <span className="text-gray-700 font-bold">My Courses</span>
              </Link>
            )}
            {/* <Link
              to="/certificate"
              className="flex items-center space-x-2 text-sm">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#8E4FFB]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span className="text-gray-700 font-bold">
                Certificate Training
              </span>
            </Link> */}
            {auth?.user ? (
              <div className="">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      // sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {/* <MenuItem
                    className="flex items-center gap-2"
                    onClick={handleClose}>
                    <Person className="bg-gray-400 text-white w-8 h-8 p-1 rounded-full" />
                    My Profile
                  </MenuItem> */}
                  <MenuItem
                    className="flex items-center gap-2"
                    onClick={() => {
                      navigate("/enrolled/my-course");
                      handleClose();
                    }}
                  >
                    <LocalLibrary className="bg-gray-400 text-white w-8 h-8 p-1 rounded-full" />
                    My Enrolled Courses
                  </MenuItem>
                  {auth?.user?.role === "Admin" && (
                    <>
                      <MenuItem
                        className="flex items-center gap-2"
                        onClick={() => navigate("/admin/dashboard")}
                      >
                        <SpaceDashboard className="bg-gray-400 text-white w-8 h-8 p-1 rounded-full" />
                        Dashboard
                      </MenuItem>
                      <Divider />
                    </>
                  )}
                  {auth?.user?.role === "Super Admin" && (
                    <>
                      <MenuItem
                        className="flex items-center gap-2"
                        onClick={() => navigate("/admin/dashboard")}
                      >
                        <SpaceDashboard className="bg-gray-400 text-white w-8 h-8 p-1 rounded-full" />
                        Dashboard
                      </MenuItem>
                      <Divider />
                    </>
                  )}
                  {auth?.user?.role === "Moderator" && (
                    <>
                      <MenuItem
                        className="flex items-center gap-2"
                        onClick={() => navigate("/admin/dashboard")}
                      >
                        <SpaceDashboard className="bg-gray-400 text-white w-8 h-8 p-1 rounded-full" />
                        Dashboard
                      </MenuItem>
                      <Divider />
                    </>
                  )}

                  <MenuItem onClick={() => dispatch(userLoggedOut())}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center text-gray-700 hover:bg-[#DB2777] hover:text-white space-x-2 text-sm border border-gray-500 hover:border-gray-200 rounded px-5 py-2"
                >
                  <IoLogIn className="text-xl" />
                  <span className="font-bold ">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center text-gray-700 hover:bg-[#DB2777] hover:text-white space-x-2 text-sm border border-gray-500 hover:border-gray-200 rounded px-5 py-2"
                >
                  <SiGnuprivacyguard className="text-xl " />
                  <span className="font-bold ">Signup</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
