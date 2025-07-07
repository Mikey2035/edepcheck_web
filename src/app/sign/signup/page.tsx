"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Header from "@/components/partials/Header";

// Dynamically imported icons to reduce initial bundle size
const FaUser = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaUser)
);
const FaEnvelope = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaEnvelope)
);
const FaBriefcase = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaBriefcase)
);
const FaBuilding = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaBuilding)
);
const FaCalendarAlt = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaCalendarAlt)
);
const FaVenusMars = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaVenusMars)
);
const FaHeart = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaHeart)
);
const FaLock = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaLock)
);
const FaEye = dynamic(() => import("react-icons/fa").then((mod) => mod.FaEye));
const FaEyeSlash = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaEyeSlash)
);

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
    gender: "",
    civil_status: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (isSubmitting) return;

    const {
      fullName,
      email,
      password,
      confirmPassword,
      division,
      position,
      birthday,
      gender,
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
      !gender ||
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

    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = useMemo(
    () =>
      [
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
          className="flex items-center border rounded-md px-3 py-2 bg-white"
        >
          <Icon className="text-blue-400 mr-3" />
          <input
            {...input}
            value={formData[input.name as keyof typeof formData]}
            onChange={handleChange}
            placeholder={input.placeholder}
            className="w-full outline-none text-sm bg-transparent text-black placeholder-black"
            required
          />
        </div>
      )),
    [formData]
  );

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#A3D8F4] via-[#BFE6FC] to-[#E3F6FF] relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <span className="absolute left-10 top-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-bubble1" />
          <span className="absolute right-20 top-32 w-16 h-16 bg-white/20 rounded-full blur-xl animate-bubble2" />
          <span className="absolute left-1/2 bottom-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-bubble3" />
        </div>

        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-blue-200 relative z-10">
          <div className="bg-blue-100 flex flex-col justify-center items-center p-10 gap-6 w-full md:w-2/5">
            <Image
              src="/images/e.png"
              alt="E-DepCheck"
              width={120}
              height={120}
            />
            <h2 className="text-3xl font-extrabold text-[#2C1E4A] text-center font-modern">
              Join E-MINDCHECK
            </h2>
            <p className="text-lg text-center text-blue-900 px-4 italic">
              "Your Mental Health Matters"
            </p>
          </div>

          <div className="w-full md:w-3/5 p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-center text-[#2C1E4A] mb-6 font-modern">
              Create an Account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderInput}

              {/* Select fields */}
              {[
                {
                  name: "division",
                  icon: FaBuilding,
                  options: [
                    "Finance and Administration",
                    "Local Government Capability Development Division",
                    "Local Government Monitoring and Evaluation Division",
                    "Project Development Monitoring Unit",
                    "Legal Unit",
                    "Office of the Regional Director",
                    "Commission on Audit",
                  ],
                },
                {
                  name: "gender",
                  icon: FaVenusMars,
                  options: [
                    "Male",
                    "Female",
                    "Transgender",
                    "Non-binary",
                    "Bisexual",
                    "Asexual",
                    "Others",
                    "Prefer not to say",
                  ],
                },
                {
                  name: "civil_status",
                  icon: FaHeart,
                  options: ["Single", "Married", "Widowed", "Divorced"],
                },
              ].map(({ name, icon: Icon, options }) => (
                <div
                  key={name}
                  className="flex items-center border rounded-md px-3 py-2 bg-white"
                >
                  <Icon className="text-blue-400 mr-3" />
                  <select
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full outline-none text-sm bg-transparent text-black"
                    required
                  >
                    <option value="">Select {name.replace("_", " ")}</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Birthday */}
              <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                <FaCalendarAlt className="text-blue-400 mr-3" />
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="w-full outline-none text-sm bg-transparent text-black"
                  required
                />
              </div>

              {/* Password Fields */}
              {["password", "confirmPassword"].map((field) => (
                <div
                  key={field}
                  className="flex items-center border rounded-md px-3 py-2 relative bg-white"
                >
                  <FaLock className="text-blue-400 mr-3" />
                  <input
                    type={
                      field === "password"
                        ? passwordVisible
                          ? "text"
                          : "password"
                        : confirmPasswordVisible
                        ? "text"
                        : "password"
                    }
                    name={field}
                    placeholder={
                      field === "password" ? "Password" : "Confirm Password"
                    }
                    value={formData[field as "password" | "confirmPassword"]}
                    onChange={handleChange}
                    className="w-full outline-none text-sm bg-transparent text-black placeholder-black"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 text-gray-500"
                    onClick={() =>
                      field === "password"
                        ? setPasswordVisible(!passwordVisible)
                        : setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    {field === "password" ? (
                      passwordVisible ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )
                    ) : confirmPasswordVisible ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>
              ))}

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
                disabled={isSubmitting}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-[#3A86FF] to-[#5F6CAF] text-white font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
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
            0%,
            100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-20px) scale(1.1);
            }
          }
          @keyframes bubble2 {
            0%,
            100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-15px) scale(1.05);
            }
          }
          @keyframes bubble3 {
            0%,
            100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-18px) scale(1.08);
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
