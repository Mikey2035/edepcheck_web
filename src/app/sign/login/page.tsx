"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";

const LogIn: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setStatusMessage("Please fill in both fields.");
      setIsSuccessful(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(data.message || "Something went wrong.");
        setIsSuccessful(false);
      } else {
        setStatusMessage("Login successful!");
        setIsSuccessful(true);

        sessionStorage.setItem("email", data.user.email);
        sessionStorage.setItem("fullName", data.user.fullname);
        sessionStorage.setItem("role", data.user.role);

        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setStatusMessage("An error occurred. Please try again.");
      setIsSuccessful(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
        <div className="text-center mb-6 group cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/w.png"
              alt="E-DepCheck Logo"
              width={80}
              height={80}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <h1 className="text-4xl font-bold text-gray-800 mt-2 transition-transform duration-300 group-hover:scale-110">
              Log In
            </h1>
          </div>
          <p className="text-gray-600 mt-2">Welcome back! Please log in to continue.</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Status Message */}
            {statusMessage && (
              <div className={`mb-4 text-sm ${isSuccessful ? "text-green-500" : "text-red-500"}`}>
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
            >
              Log In
            </button>
          </form>

          <div className="text-center mt-6 text-sm">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-blue-500 hover:underline font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LogIn;
