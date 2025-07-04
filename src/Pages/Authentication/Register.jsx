
import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ updated line
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import authImage from "../../assets/AuthImage/authImage.png";
import profastLogo from "../../assets/AuthImage/logo.png";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation(); // ✅
  const from = location.state?.from?.pathname || "/"; // ✅

  const { registerWithEmail, loginWithGoogle } = useContext(AuthContext);
  const password = watch("password");
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        { method: "POST", body: formData }
      );
      const imgbbData = await imgbbRes.json();

      if (!imgbbData.success) throw new Error("Image upload failed");

      const photoURL = imgbbData.data.url;

      await registerWithEmail(data.email, data.password, data.name, photoURL);

      const userInfo = {
        name: data.name,
        email: data.email,
        photo: photoURL,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const userRes = await axiosInstance.post("/users", userInfo);
      console.log("User DB response:", userRes.data);

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: `Welcome, ${data.name}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from); // ✅ Go back to where the user was
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message || "Something went wrong",
      });
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      const userInfo = {
        name: user.displayName || "User",
        email: user.email,
        photo: user.photoURL || "",
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const userRes = await axiosInstance.post("/users", userInfo);
      console.log("Google user DB response:", userRes.data);

      Swal.fire({
        icon: "success",
        title: "Logged in with Google!",
        text: `Welcome, ${user.displayName || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from); // ✅ Go back to where the user was
    } catch (error) {
      console.error("Google login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Something went wrong",
      });
    }
  };

  // rest of your component stays unchanged

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f6f9f0]">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        {/* LEFT: Registration Form */}
        <div className="w-full lg:w-1/2 px-10 py-12 flex flex-col justify-center">
          <div className="mb-8 flex items-center gap-4">
            <img src={profastLogo} alt="Profast Logo" className="w-7" />
            <h1 className="text-2xl font-bold text-gray-800">Profast</h1>
          </div>

          <h2 className="text-3xl font-bold text-black mb-1">Create Account</h2>
          <p className="text-sm text-gray-600 mb-6">Register with Profast</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Full Name */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className={`w-full border border-gray-300 rounded-md py-2 px-4 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Minimum 3 characters" },
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 text-sm" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full border border-gray-300 rounded-md py-2 px-4 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 text-sm" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full border border-gray-300 rounded-md py-2 px-4 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 text-sm" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full border border-gray-300 rounded-md py-2 px-4 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords don't match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Profile image is required" })}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:text-sm file:font-semibold file:bg-lime-100 file:text-lime-700 hover:file:bg-lime-200"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-500 text-white py-2 rounded-md text-sm font-medium"
            >
              Register
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-lime-600 font-medium">
                Login
              </a>
            </p>

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-400">Or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google register */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md text-sm hover:bg-gray-100"
            >
              <FaGoogle className="text-red-500" />
              <span>Register with Google</span>
            </button>
          </form>
        </div>

        {/* RIGHT: Image Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#f6f9f0] items-center justify-center p-8">
          <img
            src={authImage}
            alt="Registration illustration"
            className="w-[280px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
