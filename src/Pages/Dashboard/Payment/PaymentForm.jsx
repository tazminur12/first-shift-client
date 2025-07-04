import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import useTrackingLogger from '../../../hooks/useTrackingLogger';
import { FaCreditCard, FaLock, FaShieldAlt, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { logTracking } = useTrackingLogger();

    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardComplete, setCardComplete] = useState(false);

    const { isPending, data: parcelInfo = {}, error: parcelError } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/parcels/${parcelId}`);
                return res.data;
            } catch (error) {
                throw new Error('Failed to load parcel information');
            }
        },
        retry: 2,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const handleCardChange = (event) => {
        setCardComplete(event.complete);
        if (event.error) {
            setError(event.error.message);
        } else {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !cardComplete) return;

        setIsProcessing(true);
        setError('');

        try {
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error('Card element not found');
            }

            // Validate parcel info
            if (!parcelInfo.cost || parcelInfo.cost <= 0) {
                throw new Error('Invalid parcel cost');
            }

            // Create payment intent first
            const amount = parcelInfo.cost;
            const res = await axiosSecure.post('/create-payment-intent', {
                cost: amount,
                parcelId
            });

            if (!res.data.clientSecret) {
                throw new Error('Failed to create payment intent');
            }

            const clientSecret = res.data.clientSecret;

            // Confirm card payment directly with the CardElement
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user.displayName || 'Customer',
                        email: user.email,
                    }
                }
            });

            if (stripeError) {
                throw stripeError;
            }

            if (paymentIntent.status === 'succeeded') {
                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount,
                    transactionId: paymentIntent.id,
                    paymentMethod: paymentIntent.payment_method_types,
                    date: new Date().toISOString(),
                    status: 'completed'
                };

                const paymentRes = await axiosSecure.post('/payments', paymentData);

                if (paymentRes.data.insertedId) {
                    await Swal.fire({
                        title: 'Payment Successful! 🎉',
                        html: `
                            <div class="text-left space-y-3">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span className="font-semibold text-green-800">Transaction Complete</span>
                                    </div>
                                    <p className="text-sm text-green-700"><strong>Amount:</strong> $${amount.toFixed(2)}</p>
                                    <p className="text-sm text-green-700"><strong>Transaction ID:</strong> <code className="bg-green-100 px-1 rounded">${paymentIntent.id}</code></p>
                                    <p className="text-sm text-green-700"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                                </div>
                            </div>
                        `,
                        icon: 'success',
                        confirmButtonColor: '#10b981',
                        confirmButtonText: 'View My Parcels',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        }
                    });

                    // Log tracking
                    try {
                        await logTracking({
                            tracking_id: parcelInfo.tracking_id,
                            status: 'Payment Done',
                            details: `Payment of $${amount.toFixed(2)} received for parcel ${parcelId}`,
                            updated_by: user.email,
                        });
                    } catch (trackingError) {
                        console.warn('Failed to log tracking:', trackingError);
                    }

                    navigate('/dashboard/myParcels');
                } else {
                    throw new Error('Failed to save payment record');
                }
            } else {
                throw new Error('Payment was not successful');
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError(err.message || 'An unexpected error occurred. Please try again.');
            
            // Show error toast
            Swal.fire({
                title: 'Payment Failed',
                text: err.message || 'An unexpected error occurred. Please try again.',
                icon: 'error',
                confirmButtonColor: '#ef4444',
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#374151',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                '::placeholder': {
                    color: '#9ca3af',
                },
                ':-webkit-autofill': {
                    color: '#374151',
                },
            },
            invalid: {
                color: '#ef4444',
                iconColor: '#ef4444',
            },
        },
        hidePostalCode: true,
        classes: {
            focus: 'ring-2 ring-blue-500 ring-opacity-50',
            invalid: 'ring-2 ring-red-500 ring-opacity-50',
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading payment details...</p>
                </div>
            </div>
        );
    }

    if (parcelError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex justify-center items-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Parcel Not Found</h2>
                    <p className="text-gray-600 mb-6">The parcel you're trying to pay for could not be found or you don't have permission to access it.</p>
                    <button 
                        onClick={() => navigate('/dashboard/myParcels')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to My Parcels
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <FaCreditCard className="text-3xl text-blue-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h1>
                    <p className="text-gray-600">Secure payment for your parcel delivery</p>
                </div>

                {/* Parcel Summary Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                        <h3 className="text-white font-semibold text-lg">Parcel Summary</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-600">Parcel ID</span>
                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{parcelId}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-600">Delivery Cost</span>
                            <span className="text-2xl font-bold text-green-600">${parcelInfo.cost?.toFixed(2)}</span>
                        </div>
                        {parcelInfo.tracking_id && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Tracking ID</span>
                                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{parcelInfo.tracking_id}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Payment Form Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
                        <h3 className="text-white font-semibold text-lg flex items-center">
                            <FaLock className="mr-2" />
                            Secure Payment
                        </h3>
                    </div>
                    
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Card Information
                                </label>
                                <div className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                                    error ? 'border-red-300 bg-red-50' : 
                                    cardComplete ? 'border-green-300 bg-green-50' : 
                                    'border-gray-200 bg-gray-50'
                                }`}>
                                    <CardElement 
                                        options={cardElementOptions} 
                                        onChange={handleCardChange}
                                    />
                                </div>
                                {cardComplete && !error && (
                                    <div className="flex items-center mt-2 text-green-600">
                                        <FaCheckCircle className="mr-2" />
                                        <span className="text-sm">Card information complete</span>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                    <div className="flex items-center">
                                        <FaExclamationTriangle className="text-red-500 mr-2" />
                                        <span className="text-red-700 font-medium">{error}</span>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={!stripe || isProcessing || !cardComplete}
                                className={`w-full flex justify-center items-center py-4 px-6 rounded-xl text-lg font-semibold text-white transition-all duration-200 ${
                                    !stripe || isProcessing || !cardComplete
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg'
                                }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-3" />
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <FaShieldAlt className="mr-3" />
                                        Pay ${parcelInfo.cost?.toFixed(2)}
                                    </>
                                )}
                            </button>

                            {/* Security Badges */}
                            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-100">
                                <div className="flex items-center text-xs text-gray-500">
                                    <FaLock className="mr-1" />
                                    <span>SSL Encrypted</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                    <FaShieldAlt className="mr-1" />
                                    <span>PCI Compliant</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                    <FaCreditCard className="mr-1" />
                                    <span>Stripe Secure</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Your payment information is encrypted and secure. We never store your card details.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;