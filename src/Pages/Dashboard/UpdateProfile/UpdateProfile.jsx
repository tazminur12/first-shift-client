import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateProfile = () => {
  const { user } = useAuth(); // Firebase logged-in user
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState({
    name: '',
    contact: '',
    address: '',
    district: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/search?email=${user.email}`);
        const foundUser = res.data[0];
        if (foundUser) {
          setProfile({
            name: foundUser.name || '',
            contact: foundUser.contact || '',
            address: foundUser.address || '',
            district: foundUser.district || '',
          });
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading profile', err);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchProfile();
    }
  }, [user?.email, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.patch(`/users/${user.email}`, profile);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: 'Info',
          text: 'No changes made or user not found.',
          icon: 'info',
        });
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire('Error', 'Failed to update profile', 'error');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Profile</h2>
      <form onSubmit={handleUpdate} className="grid gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            type="text"
            className="input input-bordered w-full"
            value={profile.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Contact</label>
          <input
            name="contact"
            type="text"
            className="input input-bordered w-full"
            value={profile.contact}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            name="address"
            type="text"
            className="input input-bordered w-full"
            value={profile.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">District</label>
          <input
            name="district"
            type="text"
            className="input input-bordered w-full"
            value={profile.district}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
