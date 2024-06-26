import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import img from "../Image/BS Final dark.png";

function Nav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userData } = useSelector((state) => state.app);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const openCartHandler = () => {
    navigate("/cart");
  };

  const avatarHandler = (name) => {
    return name?.split(" ")[1]
      ? `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`
      : name?.split(" ")[0][0];
  };
  return (
    <nav className="bg-slate-200 fixed w-full z-20 top-0 left-0 ">
      <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink className="flex items-center">
          <img
            src={img}
            className="h-8 mr-3 rounded-full"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            BookShelf
          </span>
        </NavLink>
        <div className="flex md:order-2">
          <div className="mr-8 mt-1.5 cursor-pointer">
            <i className="fa-solid fa-bell"></i>
          </div>
          <div className="mr-8 mt-1.5 cursor-pointer" onClick={openCartHandler}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </div>
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={isDropdownOpen ? "true" : "false"}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            {userData?.user?.picture !== "" ? (
              <img
                className="w-8 h-8 rounded-full"
                src={userData?.user?.picture}
                alt="user photo"
              />
            ) : (
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {avatarHandler(userData?.user?.name).toUpperCase()}
              </div>
            )}
          </button>

          {/* Dropdown */}
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div
              className="absolute z-50 right-10 top-10 mt-2 text-base list-none bg-white  rounded-lg text-black"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-base font-semibold">
                  {userData?.user?.name}
                </span>
                <span className="block text-sm font-medium dark:text-gray-400">
                  {userData?.user?.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                  >
                    My Profile
                  </a>
                </li>
                <li>
                  <a
                    onClick={logout}
                    className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 "
            aria-controls="navbar-sticky"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-slate-200">
            <li>
              <NavLink
                to="/"
                className="block py-2 pl-3 pr-4 rounded md:bg-transparent  md:p-0 "
                aria-current="page"
              >
                <i className="fa-solid fa-book text-xs"></i> Library
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/activity"
                className="block py-2 pl-3 pr-4  rounded  md:hover:bg-transparent md:p-0 md:dark:hover:bg-transparent"
              >
                <i className="fas fa-tasks text-xs"></i> Activity
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mylibrary"
                className="block py-2 pl-3 pr-4 rounded  md:hover:bg-transparent md:p-0 md:dark:hover:bg-transparent "
              >
                <i className="fa-solid fa-book text-xs"></i> My Library
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/premium"
                className="block py-2 pl-3 pr-4 rounded  md:hover:bg-transparent md:p-0 md:dark:hover:bg-transparent "
              >
                <i className="fas fa-crown text-xs text-yellow-400"></i> Premium
                Books
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
