import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import MenuItem from "./Menu/MenuItem";

import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.webp";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import AdminMenu from "./Menu/AdminMenu";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [role, isLoading] = useRole();
  const { user, singOutUser, setUser } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    singOutUser()
      .then(() => {
        console.log("user logged out successfully");
        navigate("/login");
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(role);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/" className="flex gap-2 items-center">
              <img className="w-auto h-10 rounded-full" src={logo} alt="" />
              <span className="font-bold uppercase">HostelEase</span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2  rounded-lg justify-center items-center mx-auto">
              <Link to="/" className="flex gap-2 items-center">
                <img className="w-auto h-10 rounded-full" src={logo} alt="" />
                <span className="font-bold uppercase">HostelEase</span>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <MenuItem
                icon={BsGraphUp}
                label="Statistics"
                address="/dashboard"
              />

              {role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={onLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
