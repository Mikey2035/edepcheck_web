"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaHome,
  FaClipboardCheck,
  FaHistory,
  FaInfoCircle,
  FaBook,
  FaUserCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Header: React.FC = () => {
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const [fullName, setFullName] = useState<string | null>(null);
  const [examCode, setExamCode] = useState<string | null>(null);

  useEffect(() => {
    const savedFullName = sessionStorage.getItem("fullName");
    if (savedFullName) setFullName(savedFullName);

    const fetchLatestExam = async () => {
      try {
        const res = await fetch("/api/exams?latest=true");
        const data = await res.json();
        if (data && data.exam_code) {
          setExamCode(data.exam_code);
        }
      } catch (err) {
        console.error("Failed to fetch latest exam:", err);
      }
    };

    fetchLatestExam();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setFullName(null);
    window.location.href = "/sign/login";
  };

  const toggleDropdown = () => setIsProfileDropdownVisible((prev) => !prev);

  return (
    <header
      className="relative z-50 flex justify-between items-center h-20 px-6 overflow-visible"
      style={{ background: "linear-gradient(90deg, #3A86FF 0%, #5F6CAF 100%)" }}
    >
      {/* Logo without Animated Bubbles */}
      <Link
        href="/"
        className="flex items-center gap-3 cursor-pointer z-10 h-full"
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <Image
          src="/images/Brainicon.png"
          alt="Logo"
          width={44}
          height={44}
          style={{
            objectFit: "contain",
            display: "block",
            marginTop: 2,
            marginBottom: 2,
          }}
        />
        <span className="text-2xl font-black text-white tracking-tight font-modern">
          E-MINDCHECK
        </span>
      </Link>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");
        .font-modern {
          font-family: "Montserrat", Arial, Helvetica, sans-serif !important;
          letter-spacing: -0.5px;
        }
      `}</style>

      {/* Navigation */}
      <nav>
        <ul className="flex gap-4 items-center text-white font-medium">
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-transparent rounded-full shadow-sm hover:bg-white/10 transition-transform duration-300 transform hover:scale-105"
            >
              <FaHome className="text-white" />
              <span className="font-semibold">Home</span>
            </Link>
          </li>
          <li>
            {examCode ? (
              <Link
                href={`/pages/questionnaire?exam=${examCode}`}
                className="flex items-center gap-2 px-4 py-2 bg-transparent rounded-full shadow-sm hover:bg-white/10 transition-transform duration-300 transform hover:scale-105"
              >
                <FaClipboardCheck className="text-white" />
                <span className="font-semibold">Assessment</span>
              </Link>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full shadow-sm text-gray-400 cursor-not-allowed">
                <FaClipboardCheck />
                Assessment
              </span>
            )}
          </li>
          <li>
            <Link
              href="/pages/history"
              className="flex items-center gap-2 px-4 py-2 bg-transparent rounded-full shadow-sm hover:bg-white/10 transition-transform duration-300 transform hover:scale-105"
            >
              <FaHistory className="text-white" />
              <span className="font-semibold">History</span>
            </Link>
          </li>
          <li>
            <Link
              href="/pages/learnmore"
              className="flex items-center gap-2 px-4 py-2 bg-transparent rounded-full shadow-sm hover:bg-white/10 transition-transform duration-300 transform hover:scale-105"
            >
              <FaInfoCircle className="text-white" />
              <span className="font-semibold">Learn</span>
            </Link>
          </li>
          <li>
            <Link
              href="/pages/resources"
              className="flex items-center gap-2 px-4 py-2 bg-transparent rounded-full shadow-sm hover:bg-white/10 transition-transform duration-300 transform hover:scale-105"
            >
              <FaBook className="text-white" />
              <span className="font-semibold">Resources</span>
            </Link>
          </li>
          <li>
            <Link
              href="/pages/hotline"
              className="flex items-center gap-2 px-4 py-2 bg-transparent rounded-full shadow-sm hover:bg-white/10 transition-transform duration-300 transform hover:scale-105"
            >
              <FaBook className="text-white" />
              <span className="font-semibold">Hotline</span>
            </Link>
          </li>

          {/* Profile/Login */}
          {fullName ? (
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-4 py-2 bg-transparent rounded-full shadow-sm hover:bg-white/10 transition-transform duration-300 transform hover:scale-105"
              >
                <FaUserCircle className="text-white" />
                <span className="font-semibold">Profile</span>
              </button>

              {isProfileDropdownVisible && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md w-48 py-2 z-[9999]">
                  <div className="px-4 py-2 text-gray-700 border-b">
                    {fullName}
                  </div>
                  <Link
                    href="/pages/profile"
                    className="flex items-center gap-2 text-blue-600 hover:underline px-4 py-2 w-full"
                  >
                    <FaUserCircle />
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-blue-600 hover:underline px-4 py-2 w-full text-left"
                  >
                    <FaSignOutAlt />
                    Log Out
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link
                href="/sign/login"
                className="flex items-center gap-2 px-4 py-2 bg-transparent rounded-full shadow-sm hover:bg-white/10 transition-transform duration-300 transform hover:scale-105"
              >
                <FaSignInAlt className="text-white" />
                <span className="font-semibold">Sign In</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
