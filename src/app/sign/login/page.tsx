"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
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
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-[#A3D8F4] via-[#BFE6FC] to-[#E3F6FF] relative overflow-hidden">
        {/* Floating bubbles background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <span className="absolute left-10 top-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-bubble1" />
          <span className="absolute right-20 top-32 w-16 h-16 bg-white/20 rounded-full blur-xl animate-bubble2" />
          <span className="absolute left-1/2 bottom-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-bubble3" />
        </div>
        <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center">
          <Image
            src="/images/w.png"
            alt="E-DepCheck Logo"
            width={80}
            height={80}
            className="mb-4"
          />
          <h1 className="text-3xl font-bold text-[#1982C4] mb-2 font-modern">
            Log In
          </h1>
          <p className="text-gray-700 mb-6">
            Welcome back! Please log in to continue.
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <FaEye />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-blue-200 focus:border-[#1982C4] focus:ring-2 focus:ring-[#3A86FF] outline-none transition text-sm bg-white/80"
                placeholder="Email"
                required
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <FaLock />
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-blue-200 focus:border-[#1982C4] focus:ring-2 focus:ring-[#3A86FF] outline-none transition text-sm bg-white/80"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {statusMessage && (
              <div
                className={`text-sm ${
                  isSuccessful ? "text-green-500" : "text-red-500"
                }`}
              >
                {statusMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-[#3A86FF] to-[#5F6CAF] text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Log In
            </button>
          </form>
          <div className="text-center mt-6 text-sm">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/sign/signup")}
              className="text-[#3A86FF] hover:underline font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");
          .font-modern {
            font-family: "Montserrat", Arial, Helvetica, sans-serif !important;
            letter-spacing: -0.5px;
          }
          @keyframes bubble1 {
            0% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-20px) scale(1.1);
            }
            100% {
              transform: translateY(0) scale(1);
            }
          }
          @keyframes bubble2 {
            0% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-15px) scale(1.05);
            }
            100% {
              transform: translateY(0) scale(1);
            }
          }
          @keyframes bubble3 {
            0% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-18px) scale(1.08);
            }
            100% {
              transform: translateY(0) scale(1);
            }
          }
          .animate-bubble1 {
            animation: bubble1 4s infinite ease-in-out;
          }
          .animate-bubble2 {
            animation: bubble2 5s infinite ease-in-out;
          }
          .animate-bubble3 {
            animation: bubble3 6s infinite ease-in-out;
          }
        `}</style>
      </div>
    </MainLayout>
  );
};

export default LogIn;
