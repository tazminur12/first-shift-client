import React from 'react';
import useUserRole from '../../../hooks/useUserRule'; // Make sure the path is correct
import RiderDashboard from './RiderDashboard';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import ForbidderPage from '../../Forbidden/ForbiddenPage'; // Assuming you have a Forbid
import Loading from '../../../components/Loading'; // Assuming you have a Loading component
const DashHome = () => {
  const { role, isLoading} = useUserRole();

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (role === 'user') {
    return <UserDashboard />;
  }
  else if (role === 'rider') {
    return <RiderDashboard></RiderDashboard>
  }
  else if (role === 'admin') {
    return <AdminDashboard />;
  }
  else {
    return <ForbidderPage />;
  }
};

export default DashHome;
