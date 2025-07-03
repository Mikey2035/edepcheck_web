"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Header from "@/components/partials/Header";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, email, username, password, confirmPassword } = formData;
    if (!fullName || !email || !username || !password || !confirmPassword) {
      setStatusMessage("Please fill in all fields.");
      setIsSuccessful(false);
      return;
    }
    if (password !== confirmPassword) {
      setStatusMessage("Passwords do not match.");
      setIsSuccessful(false);
      return;
    }
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(data.message || "Something went wrong.");
        setIsSuccessful(false);
      } else {
        setStatusMessage("Your account has been created successfully!");
        setIsSuccessful(true);
        router.push("/sign");
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again.");
      setIsSuccessful(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl bg-white/90 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-blue-200 backdrop-blur-md">
          {/* Left Icon Section */}
          <div className="bg-blue-100 flex flex-col justify-center items-center p-10 gap-6 w-full md:w-2/5 group cursor-pointer">
            <Image src="/images/e.png" alt="E-DepCheck" width={120} height={120} className="transition-transform duration-300 group-hover:scale-110 drop-shadow-lg" />
            <h2 className="text-3xl font-extrabold text-[#2C1E4A] text-center transition-transform duration-300 group-hover:scale-110">Join E-DepCheck</h2>
            <p className="text-lg text-center text-blue-900 px-4 italic">"Your Mental Health Matters"</p>
          </div>
          {/* Right Form Section */}
          <div className="w-full md:w-3/5 p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-center text-[#2C1E4A] mb-6 tracking-tight">Create an Account</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Group */}
              {[
                { icon: FaUser, name: "fullName", placeholder: "Full Name", type: "text" },
                { icon: FaEnvelope, name: "email", placeholder: "Email", type: "email" },
                { icon: FaUserTag, name: "username", placeholder: "Username", type: "text" },
              ].map(({ icon: Icon, ...input }) => (
                <div key={input.name} className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-300 transition">
                  <Icon className="text-blue-400 mr-3" />
                  <input
                    {...input}
                    value={(formData as any)[input.name]}
                    onChange={handleChange}
                    className="w-full outline-none text-sm bg-transparent transition-all duration-300 transform focus:scale-105 hover:scale-105 focus:border-blue-500 hover:border-blue-400 border-none"
                    required
                  />
                </div>
              ))}
              {/* Password */}
              <div className="flex items-center border rounded-md px-3 py-2 relative">
                <FaLock className="text-blue-400 mr-3" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full outline-none text-sm bg-transparent transition-all duration-300 transform focus:scale-105 hover:scale-105 focus:border-blue-500 hover:border-blue-400 border-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* Confirm Password */}
              <div className="flex items-center border rounded-md px-3 py-2 relative">
                <FaLock className="text-blue-400 mr-3" />
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full outline-none text-sm bg-transparent transition-all duration-300 transform focus:scale-105 hover:scale-105 focus:border-blue-500 hover:border-blue-400 border-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* Status Message */}
              {statusMessage && (
                <p className={`text-sm ${isSuccessful ? "text-green-500" : "text-red-500"}`}>
                  {statusMessage}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-[#2C1E4A] text-white py-2 rounded-md hover:bg-[#1f1532] transition"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center mt-6 text-sm text-gray-500">
              Already have an account?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => router.push("/sign")}
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 