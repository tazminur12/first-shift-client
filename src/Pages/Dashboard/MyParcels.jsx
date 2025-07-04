import React, { useState, useMemo, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaEye, FaTrash, FaCreditCard, FaSearch } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const parcelsPerPage = 5;
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);

    useEffect(() => {
        document.title = 'My Parcels | Dashboard';
    }, []);

    const { data: parcels = [], isLoading, isError } = useQuery({
        queryKey: ['myParcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`,{
            });
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        MySwal.fire({
            title: 'Delete Parcel?',
            text: 'This action cannot be undone. All parcel data will be permanently removed.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3342f',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Delete Parcel',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/parcels/${id}`);
                    if (res.data.deletedCount > 0) {
                        MySwal.fire({
                            title: 'Deleted!',
                            text: 'Parcel has been successfully deleted.',
                            icon: 'success',
                            confirmButtonColor: '#10B981'
                        });
                        queryClient.invalidateQueries(['myParcels']);
                    }
                } catch (err) {
                    console.error(err);
                    MySwal.fire({
                        title: 'Error!',
                        text: 'Failed to delete parcel. Please try again.',
                        icon: 'error',
                        confirmButtonColor: '#e3342f'
                    });
                }
            }
        });
    };

    const handlePay = (parcelId) => {
        MySwal.fire({
            title: 'Proceed to Payment?',
            text: 'You will be redirected to the secure payment page.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10B981',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Continue to Payment',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/dashboard/payment/${parcelId}`);
            }
        });
    };

    const handleView = (parcelId) => {
        navigate(`/dashboard/parcel-details/${parcelId}`);
    };

    const filteredParcels = useMemo(() => {
        return parcels.filter(parcel =>
            parcel.receiver_region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parcel.delivery_status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parcel.tracking_id?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, parcels]);

    const indexOfLastParcel = currentPage * parcelsPerPage;
    const indexOfFirstParcel = indexOfLastParcel - parcelsPerPage;
    const currentParcels = filteredParcels.slice(indexOfFirstParcel, indexOfLastParcel);
    const totalPages = Math.ceil(filteredParcels.length / parcelsPerPage);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <ImSpinner8 className="animate-spin text-4xl text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">
                            Failed to load parcels. Please try refreshing the page.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">My Parcels</h2>
                    <div className="relative mt-2 md:mt-0">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search parcels..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tracking ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Receiver
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Destination
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cost
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Payment
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentParcels.length > 0 ? (
                            currentParcels.map((parcel, index) => (
                                <tr key={parcel._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {indexOfFirstParcel + index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{parcel.tracking_id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {parcel.type || 'Standard'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{parcel.receiver_name}</div>
                                        <div className="text-sm text-gray-500">{parcel.receiver_contact}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{parcel.receiver_region}</div>
                                        <div className="text-sm text-gray-500">{parcel.receiver_center}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(parcel.creation_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {parcel.cost}৳
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${parcel.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {parcel.payment_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${parcel.delivery_status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {parcel.delivery_status.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
  <div className="flex space-x-2 justify-end">
    <button
      onClick={() => handleView(parcel._id)}
      className="inline-flex items-center px-3 py-1.5 border border-blue-200 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 shadow-sm transition-colors"
    >
      <FaEye className="mr-1.5 h-3.5 w-3.5" />
      View
    </button>
    <button
      onClick={() => handlePay(parcel._id)}
      disabled={parcel.payment_status === 'paid'}
      className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md shadow-sm transition-colors ${
        parcel.payment_status === 'paid'
          ? 'border-gray-300 text-gray-500 bg-gray-200 cursor-not-allowed'
          : 'border-green-500 text-white bg-green-500 hover:bg-green-600'
      }`}
    >
      <FaCreditCard className="mr-1.5 h-3.5 w-3.5" />
      Pay
    </button>
    <button
      onClick={() => handleDelete(parcel._id)}
      className="inline-flex items-center px-3 py-1.5 border border-red-500 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 shadow-sm transition-colors"
    >
      <FaTrash className="mr-1.5 h-3.5 w-3.5" />
      Delete
    </button>
  </div>
</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No parcels found. {searchTerm && 'Try adjusting your search query.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstParcel + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(indexOfLastParcel, filteredParcels.length)}</span> of{' '}
                                <span className="font-medium">{filteredParcels.length}</span> parcels
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1 ? 'z-10 bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyParcels;