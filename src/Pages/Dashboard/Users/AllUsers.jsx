import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const handleMakeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to make this user an admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, make admin!',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role: 'admin' });
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success!', 'User has been made an admin.', 'success');
        refetch();
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update role.', 'error');
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">All Users</h2>

      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{user.name || 'N/A'}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === 'admin' ? (
                      <span className="badge badge-success gap-1">
                        <FaUserShield /> Admin
                      </span>
                    ) : (
                      <span className="badge badge-info">User</span>
                    )}
                  </td>
                  <td className="text-right">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-sm btn-outline btn-success"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
