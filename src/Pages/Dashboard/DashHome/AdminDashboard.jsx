import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const fetchStatusCounts = async () => {
    const response = await axiosSecure.get('/parcels/delivery/status-count');
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['statusCounts'],
    queryFn: fetchStatusCounts,
  });

  // Color palette for the chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Status icons mapping
  const statusIcons = {
    'pending': <FiClock className="text-yellow-500" />,
    'in-transit': <FiTruck className="text-blue-500" />,
    'delivered': <FiCheckCircle className="text-green-500" />,
    'failed': <FiAlertCircle className="text-red-500" />,
    'unknown': <FiPackage className="text-gray-500" />,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error: {error?.message || 'Failed to fetch status counts'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of parcel delivery statuses</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <FiPackage className="mr-1" /> Total Parcels: {data.reduce((sum, item) => sum + item.count, 0)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Status Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="status"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    value, 
                    `${props.payload.status}: ${((props.payload.percent || 0) * 100).toFixed(2)}%`
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Details Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Status Details</h2>
          <div className="space-y-4">
            {data.map(({ status, count }, index) => (
              <div key={status} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-opacity-20" style={{ backgroundColor: `${COLORS[index % COLORS.length]}20` }}>
                    {statusIcons[status] || statusIcons['unknown']}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800 capitalize">{status || 'Unknown'}</h3>
                    <p className="text-sm text-gray-500">Parcels with this status</p>
                  </div>
                </div>
                <div className="text-xl font-bold" style={{ color: COLORS[index % COLORS.length] }}>
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.map(({ status, count }, index) => (
          <div key={`card-${status}`} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Status</p>
                <h3 className="text-2xl font-semibold text-gray-800 capitalize mt-1">{status || 'Unknown'}</h3>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: `${COLORS[index % COLORS.length]}20` }}>
                {statusIcons[status] || statusIcons['unknown']}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-3xl font-bold" style={{ color: COLORS[index % COLORS.length] }}>
                {count}
              </p>
              <p className="text-sm text-gray-500 mt-1">Parcels</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;