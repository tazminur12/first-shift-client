import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import ProFastLogo from '../assets/Logo/logo.png';
import useAuth from '../hooks/useAuth';
import { FaUserCircle, FaBars, FaTimes, FaSignOutAlt, FaHome, FaBox, FaHistory, FaMapMarkerAlt, FaUser, FaShieldAlt, FaUsers, FaMotorcycle, FaUserCheck, FaHourglassHalf, FaMotorcycle as FaRider, FaClock, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';
import useUserRole from '../hooks/useUserRule';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { role, loading: roleLoading } = useUserRole();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation links configuration with icons
  const navigationLinks = {
    common: [
      { path: '/dashboard', label: 'Home', icon: FaHome, exact: true },
      { path: '/dashboard/myParcels', label: 'My Parcels', icon: FaBox },
      { path: '/dashboard/paymentHistory', label: 'Payment History', icon: FaHistory },
      { path: '/dashboard/track', label: 'Tracking', icon: FaMapMarkerAlt },
      { path: '/dashboard/update-profile', label: 'Update Profile', icon: FaUser },
    ],
    admin: role === 'admin' && !roleLoading ? [
      { path: '/dashboard/makeAdmin', label: 'Make Admin', icon: FaShieldAlt },
      { path: '/dashboard/users', label: 'Users', icon: FaUsers },
      { path: '/dashboard/assign-rider', label: 'Assign Rider', icon: FaMotorcycle },
      { path: '/dashboard/active-riders', label: 'Active Riders', icon: FaUserCheck },
      { path: '/dashboard/pending-riders', label: 'Pending Riders', icon: FaHourglassHalf },
    ] : [],
    rider: role === 'rider' && !roleLoading ? [
      { path: '/dashboard/my-deliveries', label: 'My Deliveries', icon: FaRider },
      { path: '/dashboard/pending-deliveries', label: 'Pending Deliveries', icon: FaClock },
      { path: '/dashboard/complete-deliveries', label: 'Completed Deliveries', icon: FaCheckCircle },
      { path: '/dashboard/my-earnings', label: 'My Earnings', icon: FaMoneyBillWave },
    ] : []
  };

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Combine links based on user role
  const getNavLinks = () => {
    let links = [...navigationLinks.common];
    if (role === 'admin') links = [...links, ...navigationLinks.admin];
    if (role === 'rider') links = [...links, ...navigationLinks.rider];
    return links;
  };

  const navLinks = getNavLinks();

  return (
        <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navigation Header */}
        <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-ghost btn-sm drawer-button p-2 rounded-lg hover:bg-gray-100"
                aria-label="Open menu"
              >
                <FaBars className="h-5 w-5 text-gray-600" />
              </label>
              <div className="flex items-center space-x-2">
                <img src={ProFastLogo} alt="ProFast Logo" className="h-8" />
                <span className="font-bold text-lg text-gray-800">ProFast</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar" aria-label="User menu">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden flex items-center justify-center text-white font-semibold">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="User profile" className="w-full h-full object-cover" />
                    ) : (
                      <span>{user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}</span>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Sidebar Navigation */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay" aria-label="Close menu"></label>
        <aside className="w-80 min-h-full bg-white shadow-xl border-r border-gray-200 flex flex-col">
          {/* Brand Logo */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
            <NavLink to="/" className="flex flex-col items-center">
              <div className="flex items-center space-x-3">
                <img src={ProFastLogo} alt="ProFast Logo" className="h-10" />
                <div className="text-white">
                  <h2 className="text-xl font-bold">ProFast Courier</h2>
                  <p className="text-blue-100 text-sm">Dashboard</p>
                </div>
              </div>
            </NavLink>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden flex items-center justify-center text-white font-semibold text-xl">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User profile'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 truncate">{user?.displayName || 'User'}</h3>
                <p className="text-sm text-gray-500 truncate">{user?.email || ''}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1 capitalize">
                  {role || 'user'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.exact}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <link.icon className={`text-xl mr-3 ${link.exact ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                  <span className="font-medium">{link.label}</span>
                  {link.exact && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer with Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
              aria-label="Logout"
            >
              <FaSignOutAlt className="text-xl mr-3 text-gray-500 group-hover:text-red-600" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;