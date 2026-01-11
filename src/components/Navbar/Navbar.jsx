import { useContext, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink 
          to="/" 
          className="block px-4 py-2 hover:bg-base-200 rounded-lg transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/allcontests" 
          className="block px-4 py-2 hover:bg-base-200 rounded-lg transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          All Contests
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/about" 
          className="block px-4 py-2 hover:bg-base-200 rounded-lg transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/contacts" 
          className="block px-4 py-2 hover:bg-base-200 rounded-lg transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contacts
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink 
            to="/my-profile" 
            className="block px-4 py-2 hover:bg-base-200 rounded-lg transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Profile
          </NavLink>
        </li>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast("You Logged Out Successfully");
        setIsUserMenuOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserMenuOpen(false); // Close user menu when opening mobile menu
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsMobileMenuOpen(false); // Close mobile menu when opening user menu
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4 sm:px-6 lg:px-8 relative">
        
        {/* Mobile Menu Button & Logo */}
        <div className="navbar-start flex items-center">
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="btn btn-ghost btn-square"
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3 ml-2 lg:ml-0">
            <img className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" src={logo} alt="logo" />
            <NavLink to="/" className="btn btn-ghost text-lg sm:text-xl text-secondary font-bold hidden sm:block">
              Contest Hub
            </NavLink>
            <NavLink to="/" className="btn btn-ghost text-base text-secondary font-bold sm:hidden">
              Hub
            </NavLink>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
        </div>

        {/* User Menu */}
        <div className="navbar-end">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                data-tip={user.displayName || "Account"}
                aria-label="User menu"
              >
                <div className="w-8 sm:w-10 rounded-full">
                  <img src={user.photoURL} alt="profile" />
                </div>
              </button>
            </div>
          ) : (
            <NavLink to="/auth" className="btn btn-primary btn-sm sm:btn-md">
              <span className="hidden sm:inline">Log In</span>
              <span className="sm:hidden">Login</span>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-[60] lg:hidden animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Mobile Menu */}
            <div className="absolute top-full left-0 right-0 bg-base-100 shadow-lg border-t z-[70] lg:hidden animate-slide-down">
              <ul className="menu p-4 space-y-2">
                {links}
              </ul>
            </div>
          </>
        )}

        {/* User Menu Dropdown */}
        {user && isUserMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 sm:w-52 bg-base-100 rounded-box shadow-lg border z-[100] p-2 animate-slide-down">
            <ul>
              <li>
                <p className="font-semibold text-sm sm:text-base text-secondary truncate px-4 py-2">
                  {user.displayName}
                </p>
              </li>
              <li>
                <NavLink 
                  to="/dashboard" 
                  className="block px-4 py-2 hover:bg-base-200 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button 
                  onClick={handleLogOut} 
                  className="block w-full text-left px-4 py-2 hover:bg-base-200 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Click outside handler for user menu */}
        {isUserMenuOpen && (
          <div 
            className="fixed inset-0 z-[50]"
            onClick={() => setIsUserMenuOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
