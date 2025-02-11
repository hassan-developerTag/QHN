import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoEyeSharp,
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { FaEyeSlash, FaUpload, FaUserMd, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [selectedRole, setSelectedRole] = useState("patient");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setValue("image", file); // Set image file in React Hook Form
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("role", selectedRole);

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        "https://qhn.vercel.app/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });

        navigate("/kycVerification");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Left Side: Branding & Info */}
          <div className="lg:w-5/12 bg-gradient-to-br from-green-600 to-green-800 p-12 text-white">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-6">
                  Quantum Health Networks
                </h1>
                <p className="text-lg text-green-100 mb-8">
                  Join our network of healthcare professionals and patients to
                  experience the future of digital healthcare.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span>Secure and encrypted data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <span>Real-time health monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <span>Connect with specialists</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-sm text-green-100">
                  Already have an account?
                </p>
                <Link
                  to="/login"
                  className="inline-block mt-2 text-white hover:text-green-200 font-medium"
                >
                  Sign in to your account →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Sign Up Form */}
          <div className="lg:w-7/12 p-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Create Account
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Role Selection */}
                <div className="flex space-x-4 mb-8">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("patient")}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      selectedRole === "patient"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <FaUser
                      className={`w-6 h-6 mx-auto mb-2 ${
                        selectedRole === "patient"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    <h3 className="font-medium text-center">Patient</h3>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("partner")}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      selectedRole === "partner"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <FaUserMd
                      className={`w-6 h-6 mx-auto mb-2 ${
                        selectedRole === "partner"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    <h3 className="font-medium text-center">
                      Healthcare Partner
                    </h3>
                  </button>
                </div>

                {/* Input Fields */}
                <div className="relative">
                  <IoPersonOutline className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <IoMailOutline className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    {...register("email", { required: "Email is required" })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <IoLockClosedOutline className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <IoLockClosedOutline className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*,.pdf"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center space-x-2 w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors"
                  >
                    <FaUpload className="text-gray-400" />
                    <span className="text-gray-600">
                      {image ? image.name : "Upload profile picture"}
                    </span>
                  </label>
                </div>

                {image && (
                  <div className="flex items-center space-x-2">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      {image.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-xs text-gray-500">PDF</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{image.name}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
