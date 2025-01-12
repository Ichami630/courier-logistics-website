import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-primary-100 px-3 py-2"
      : "text-white px-3 py-2 hover:text-primary-100";

  // Function to close the menu on item click
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-secondary-100 fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <span className="text-primary-200 text-3xl font-bold">USPS</span>
            </NavLink>
          </div>

          {/* Hamburger Menu for Small Screens */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary-200 focus:outline-none"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Links */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex md:space-x-2 absolute md:static top-20 left-0 w-full md:w-auto bg-secondary-100 md:bg-transparent z-10`}
          >
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
              <NavLink to="/" className={linkClass} onClick={handleLinkClick}>
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={linkClass}
                onClick={handleLinkClick}
              >
                About Us
              </NavLink>
              <NavLink
                to="/services"
                className={linkClass}
                onClick={handleLinkClick}
              >
                Services
              </NavLink>
              <NavLink
                to="/contact"
                className={linkClass}
                onClick={handleLinkClick}
              >
                Contact Us
              </NavLink>
              <NavLink 
                to="/track" 
                className="px-2 py-2 sm:hover:text-primary-100 md:hover:text-white md:font-bold md:rounded-md md:bg-accent-100 text-white" 
                onClick={handleLinkClick} > Track & Trace </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
