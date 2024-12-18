import React from "react";
import { NavLink } from "react-router-dom";
import  vots  from "../assets/vots.jpg";
import { FaUser, FaHome } from "react-icons/fa"; 
function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <NavLink to="/home" className="flex items-center space-x-2">
            <img
              src={vots}
              alt="Logo"
              className="h-10 w-10 object-cover rounded-full" // Logo size and rounded shape
            />
            <span className="text-2xl font-bold">VOTE</span> {/* Optional text */}
          </NavLink>
        </div>

        {/* Navigation Section */}
        <nav className="flex space-x-6">
          <NavLink
            to="/result"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Result
          </NavLink>
          <NavLink
            to="/admin"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Admin
          </NavLink>
          
          <NavLink
            to="/profile"
            className="hover:text-blue-400 transition-colors duration-300"
          >
           <FaUser className="h-5 w-5" /> 
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
