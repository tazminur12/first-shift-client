import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'; // ✅ Added useLocation
import loginImage from '../../assets/AuthImage/authImage.png';
import profastLogo from '../../assets/AuthImage/logo.png';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginWithEmail, loginWithGoogle, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Get current location
    const from = location.state?.from?.pathname || "/"; // ✅ Where to go after login

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await loginWithEmail(email, password);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome back!',
                timer: 1500,
                showConfirmButton: false
            });
            navigate(from); // ✅ Redirect to previous page
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message || 'Login failed!',
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            Swal.fire({
                icon: 'success',
                title: 'Google Login Successful!',
                text: 'Welcome back!',
                timer: 1500,
                showConfirmButton: false
            });
            navigate(from); // ✅ Redirect to previous page
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message || 'Google login failed!',
            });
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f6f9f0]">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">

                {/* LEFT: Login Form */}
                <div className="w-full lg:w-1/2 px-10 py-12 flex flex-col justify-center">
                    <div className="mb-8 flex items-center gap-4">
                        <img src={profastLogo} alt="Profast Logo" className="w-7" />
                        <h1 className="text-2xl font-bold text-gray-800">Profast</h1>
                    </div>

                    <h2 className="text-3xl font-bold text-black mb-1">Welcome Back</h2>
                    <p className="text-sm text-gray-600 mb-6">Login with Profast</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className={`w-full border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 ${errors.email ? 'border-red-500' : ''}`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email"
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className={`w-full border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 ${errors.password ? 'border-red-500' : ''}`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Forgot */}
                        <div className="text-right">
                            <NavLink to="/forgot-password" className="text-xs text-gray-500 hover:text-lime-600">
                                Forgot Password?
                            </NavLink>
                        </div>

                        {/* Login button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-lime-400 hover:bg-lime-500 text-white py-2 rounded-md text-sm font-medium disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        {/* Register link */}
                        <p className="text-center text-sm text-gray-600">
                            Don't have any account?{' '}
                            <NavLink to="/register" className="text-lime-600 font-medium">
                                Register
                            </NavLink>
                        </p>

                        {/* Divider */}
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-xs text-gray-400">Or</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Google login */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md text-sm hover:bg-gray-100"
                        >
                            <FaGoogle className="text-red-500" />
                            <span>Login with Google</span>
                        </button>
                    </form>
                </div>

                {/* RIGHT: Image Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-[#f6f9f0] items-center justify-center p-8">
                    <img
                        src={loginImage}
                        alt="Login illustration"
                        className="w-[280px] object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
