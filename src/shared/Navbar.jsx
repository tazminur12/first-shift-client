import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, X, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [userMenuOpen, setUserMenuOpen] = useState(false); // user info dropdown
  const navigate = useNavigate();

  // Close user menu when clicked outside
  const userMenuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setUserMenuOpen(false);
      setIsOpen(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-3 h-6 bg-green-400 rounded-tr-xl rounded-bl-xl"></div>
            <span className="text-xl font-bold text-gray-800">Profast</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>Home</NavLink>
            <NavLink to="/service" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>Services</NavLink>
            <NavLink to="/coverage" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>Coverage</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>About Us</NavLink>
            <NavLink to="/sentparcel" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>Sent Parcel</NavLink>
            <NavLink to="/pricing" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>Pricing</NavLink>
            {user && (
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {user ? (
              <>
                <button
                  onClick={() => setUserMenuOpen(prev => !prev)}
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2 focus:outline-none"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  {user.displayName || user.email}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div
                    ref={userMenuRef}
                    className="absolute right-0 mt-10 w-48 bg-white border rounded-md shadow-lg py-2 text-gray-700 z-50"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <NavLink to="/login">
                <button className="border border-gray-300 px-5 py-2 rounded-full font-medium text-gray-700 hover:bg-gray-100">
                  Sign In
                </button>
              </NavLink>
            )}
            <NavLink to="/be-rider">
              <button className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-5 py-2 rounded-full flex items-center gap-1">
                Be a rider <ArrowUpRight size={18} />
              </button>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-4 text-gray-700 font-medium pb-4">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>Home</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>Services</NavLink>
            <NavLink to="/coverage" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>Coverage</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>About Us</NavLink>
            <NavLink to="/sentparcel" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>Sent Parcel</NavLink>
            <NavLink to="/pricing" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>Pricing</NavLink>
            <NavLink to="/be-rider" className={({ isActive }) => isActive ? "text-green-500 font-semibold" : "hover:text-green-500 transition"}>Be a Rider</NavLink>

            {user ? (
              <>
                <span className="mt-2 font-semibold">{user.displayName || user.email}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                    setUserMenuOpen(false);
                  }}
                  className="border border-gray-300 px-4 py-2 rounded-full mt-2 text-sm w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                <button className="border border-gray-300 px-4 py-2 rounded-full mt-2 text-sm w-full">
                  Sign In
                </button>
              </NavLink>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
