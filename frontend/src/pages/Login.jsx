import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IoEyeSharp, IoMailOutline, IoLockClosedOutline, IoLogoGoogle } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post("https://qhn-hassan-mehmoods-projects-2e3cea23.vercel.app/", data);

      if (response.data.success) {
        // Store user data
        localStorage.setItem("token", response.data.jwtToken);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);

        toast.success('Successfully logged in!', {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });

        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed', {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col-reverse lg:flex-row rounded-3xl bg-white shadow-2xl overflow-hidden">
            {/* Left Side: Login Form */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <CardHeader className="space-y-1 p-0 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
                      <CardDescription className="text-gray-500">
                        Enter your credentials to access your account
                      </CardDescription>
                    </div>
                    <div className="h-12 w-12">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-12 w-12 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <IoMailOutline className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      {/* <Button 
                        variant="link" 
                        className="px-0 font-normal text-xs text-blue-600"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle forgot password
                        }}
                      >
                        Forgot password?
                      </Button> */}
                    </div>
                    <div className="relative">
                      <IoLockClosedOutline className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="h-5 w-5" />
                        ) : (
                          <IoEyeSharp className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </div>
                    ) : (
                      "Sign in"
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-green-500 hover:underline font-medium">
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>

            {/* Right Side: Brand Message */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-green-600 to-green-800 p-8 lg:p-12 flex items-center">
              <div className="w-full text-white">
                <h1 className="text-4xl font-bold mb-6">Quantum Health Networks</h1>
                <p className="text-xl text-blue-100 mb-8">
                  Access your healthcare dashboard and manage your medical records securely.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Secure Platform</h3>
                      <p className="text-blue-100 text-sm">Your data is protected with enterprise-grade security</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Digital Records</h3>
                      <p className="text-blue-100 text-sm">Access your medical history anytime, anywhere</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">24/7 Support</h3>
                      <p className="text-blue-100 text-sm">Get help whenever you need it</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;