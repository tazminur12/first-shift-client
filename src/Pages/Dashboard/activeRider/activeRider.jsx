import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaSearch, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Swal from 'sweetalert2';

const ActiveRider = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ['active-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active');
      return res.data;
    },
  });

  const handleStatusChange = async (id, newStatus, email) => {
    const action = newStatus === 'inactive' ? 'Deactivate' : 'Activate';

    const confirm = await Swal.fire({
      title: `${action} this rider?`,
      text: newStatus === 'inactive'
        ? 'They will no longer be able to access the rider dashboard.'
        : 'They will regain access to the rider dashboard.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'inactive' ? '#ef4444' : '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${action.toLowerCase()}`,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${id}/status`, {
        status: newStatus,
        email: email,
      });

      Swal.fire({
        title: 'Success!',
        text: `Rider ${newStatus === 'inactive' ? 'deactivated' : 'activated'} successfully`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });

      refetch();
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: `Failed to ${action.toLowerCase()} rider`,
        icon: 'error',
      });
    }
  };

  const filteredRiders = riders.filter(
    (rider) =>
      rider.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.contact?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="badge badge-success gap-1">
            <FaCheckCircle /> Active
          </span>
        );
      case 'inactive':
        return (
          <span className="badge badge-error gap-1">
            <FaTimesCircle /> Inactive
          </span>
        );
      default:
        return (
          <span className="badge badge-info gap-1">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Active Riders</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all active delivery riders</p>
        </div>

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search riders..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th><FiUser className="inline mr-1" /> Rider</th>
                  <th><FiMail className="inline mr-1" /> Email</th>
                  <th><FiPhone className="inline mr-1" /> Contact</th>
                  <th><FiMapPin className="inline mr-1" /> Location</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRiders.length > 0 ? (
                  filteredRiders.map((rider) => (
                    <tr key={rider._id}>
                      <td>
                        <div className="flex items-center">
                          <div className="avatar placeholder mr-3">
                            <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center">
                              {rider.name?.charAt(0) || 'R'}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">{rider.name}</p>
                            <p className="text-xs text-gray-500">ID: {rider._id?.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td>{rider.email}</td>
                      <td>{rider.contact || 'N/A'}</td>
                      <td>
                        <div>
                          <p className="font-medium">{rider.district || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{rider.region || ''}</p>
                        </div>
                      </td>
                      <td>{getStatusBadge(rider.status)}</td>
                      <td>
                        {new Date(rider.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="text-right">
                        {rider.status === 'active' ? (
                          <button
                            onClick={() => handleStatusChange(rider._id, 'inactive', rider.email)}
                            className="btn btn-sm btn-error"
                          >
                            <FaTimesCircle className="mr-1" /> Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(rider._id, 'active', rider.email)}
                            className="btn btn-sm btn-success"
                          >
                            <FaCheckCircle className="mr-1" /> Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      <FaSearch className="text-3xl mb-2 mx-auto" />
                      <p className="font-medium">No riders found</p>
                      <p className="text-sm">Try adjusting your search query</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveRider;
