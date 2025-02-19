import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.webp";
import useAuth from "../../../hooks/useAuth";
const Header = () => {
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

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/meals">Meals</Link>
      </li>
      <li>
        <Link to="/upcomingMeals">Upcoming Meals</Link>
      </li>
      <li className="mt-4 md:mt-0 md:mr-4">
        <button className="btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </li>
      {!user && (
        <li>
          <Link className="border" to="/login">
            Join Us
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/45">
      <div className="navbar  container  mx-auto ">
        <div className="flex-1">
          <Link to="/" className="flex gap-2 items-center">
            <img className="w-auto h-10 rounded-full" src={logo} alt="" />
            <span className="font-bold uppercase">HostelEase</span>
          </Link>
        </div>
        <div className="flex-none">
          {/* Desktop Menu */}
          <ul className="menu menu-horizontal px-1 hidden md:flex">{links}</ul>

          {/* Mobile Menu */}
          <div className="dropdown md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 -ml-[150px] w-52 rounded-box z-[1] mt-3  p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {user && (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div title={user?.displayName} className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="cursor-text">
                  <p>{user?.displayName}</p>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="mt-2">
                  <button
                    onClick={onLogout}
                    className="bg-gray-200 block text-center"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
