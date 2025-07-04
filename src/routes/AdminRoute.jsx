import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRule';
// import LoadingSpinner from '../components/LoadingSpinner'; // Assuming you have a spinner component

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const { role,  roleLoading } = useUserRole();
    const location = useLocation();
    // Show loading state while checking auth and role
    if (authLoading || roleLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                 Loading...
                {/* <LoadingSpinner /> Replace with your preferred loading indicator */}
            </div>
        );
    }

    // If user is not logged in, redirect to login with return location
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If user is logged in but not admin, redirect to forbidden page
    if (role !== 'admin') {
        return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }

    // If user is admin, render the child routes
   return  children  ;
};

export default AdminRoute;