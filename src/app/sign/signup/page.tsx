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
  FaBuilding,
  FaBriefcase,
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
    division: "",
    position: "",
    birthday: "",
    sex_and_gender: "",
    civil_status: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      fullName,
      email,
      password,
      confirmPassword,
      division,
      position,
      birthday,
      sex_and_gender,
      civil_status,
    } = formData;

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !division ||
      !position ||
      !birthday ||
      !sex_and_gender ||
      !civil_status
    ) {
      setStatusMessage("Please fill in all required fields.");
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
        router.push("/sign/login");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setStatusMessage("An error occurred. Please try again.");
      setIsSuccessful(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#A3D8F4] via-[#BFE6FC] to-[#E3F6FF] relative overflow-hidden">
        {/* Floating bubbles background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <span className="absolute left-10 top-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-bubble1" />
          <span className="absolute right-20 top-32 w-16 h-16 bg-white/20 rounded-full blur-xl animate-bubble2" />
          <span className="absolute left-1/2 bottom-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-bubble3" />
        </div>
        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-blue-200 backdrop-blur-md relative z-10">
          {/* Left */}
          <div className="bg-blue-100 flex flex-col justify-center items-center p-10 gap-6 w-full md:w-2/5">
            <Image
              src="/images/e.png"
              alt="E-DepCheck"
              width={120}
              height={120}
            />
            <h2 className="text-3xl font-extrabold text-[#2C1E4A] text-center font-modern">
              Join E-DepCheck
            </h2>
            <p className="text-lg text-center text-blue-900 px-4 italic">
              "Your Mental Health Matters"
            </p>
          </div>

          {/* Right */}
          <div className="w-full md:w-3/5 p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-center text-[#2C1E4A] mb-6 font-modern">
              Create an Account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                {
                  icon: FaUser,
                  name: "fullName",
                  placeholder: "Full Name",
                  type: "text",
                },
                {
                  icon: FaEnvelope,
                  name: "email",
                  placeholder: "Email",
                  type: "email",
                },
                {
                  icon: FaBriefcase,
                  name: "position",
                  placeholder: "Position",
                  type: "text",
                },
              ].map(({ icon: Icon, ...input }) => (
                <div
                  key={input.name}
                  className="flex items-center border rounded-md px-3 py-2"
                >
                  <Icon className="text-blue-400 mr-3" />
                  <input
                    {...input}
                    value={(formData as any)[input.name]}
                    onChange={handleChange}
                    className="w-full outline-none text-sm bg-transparent"
                    required
                  />
                </div>
              ))}

              {/* Division Dropdown */}
              <div className="flex items-center border rounded-md px-3 py-2">
                <FaBuilding className="text-blue-400 mr-3" />
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className={`w-full outline-none text-sm bg-transparent ${
                    formData.division ? "text-black" : "text-gray-400"
                  }`}
                  required
                >
                  <option value="">Select Division</option>
                  <option value="Finance and Administration">
                    Finance and Administration
                  </option>
                  <option value="Local Government Capability Development Division">
                    Local Government Capability Development Division
                  </option>
                  <option value="Local Government Monitoring and Evaluation Division">
                    Local Government Monitoring and Evaluation Division
                  </option>
                  <option value="Project Development Monitoring Unit">
                    Project Development Monitoring Unit
                  </option>
                  <option value="Legal Unit">Legal Unit</option>
                  <option value="Office of the Regional Director">
                    Office of the Regional Director
                  </option>
                  <option value="Commission on Audit">
                    Commission on Audit
                  </option>
                </select>
              </div>

              {/* Birthday */}
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm"
                required
              />

              {/* Sex and Gender (Dropdown) */}
              <select
                name="sex_and_gender"
                value={formData.sex_and_gender}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm"
                required
              >
                <option value="">Select Sex and Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>

              {/* Civil Status */}
              <select
                name="civil_status"
                value={formData.civil_status}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm"
                required
              >
                <option value="">Select Civil Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Divorced">Divorced</option>
              </select>

              <div className="flex items-center border rounded-md px-3 py-2 relative">
                <FaLock className="text-blue-400 mr-3" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full outline-none text-sm bg-transparent"
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

              <div className="flex items-center border rounded-md px-3 py-2 relative">
                <FaLock className="text-blue-400 mr-3" />
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full outline-none text-sm bg-transparent"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <p
                  className={`text-sm ${
                    isSuccessful ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {statusMessage}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-[#3A86FF] to-[#5F6CAF] text-white font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-500">
              Already have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => router.push("/sign/login")}
              >
                Log In
              </button>
            </p>
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
    </>
  );
}
