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
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
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
    window.location.href = "/sign";
  };

  const toggleDropdown = () => setIsProfileDropdownVisible((prev) => !prev);

  return (
    <header className="relative z-50 flex justify-between items-center h-20 bg-blue-100 px-6 shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <Image src="/images/Brainicon.png" alt="Logo" width={48} height={48} />
        <span className="text-2xl font-black text-[#1c2e4a] tracking-tight">
          E-DepCheck
        </span>
      </Link>

      {/* Navigation */}
      <nav>
        <ul className="flex gap-4 items-center text-blue-900 font-medium">
          {/* Reusable Nav Item */}
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:bg-blue-200 transition-transform duration-300 transform hover:scale-105"
            >
              <FaHome className="text-blue-800" />
              <span className="font-semibold">Home</span>
            </Link>
          </li>
          <li>
            {examCode ? (
              <Link
                href={`/pages/questionnaire?exam=${examCode}`}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:bg-blue-200 transition-transform duration-300 transform hover:scale-105"
              >
                <FaClipboardCheck className="text-blue-800" />
                <span className="font-semibold">Assessment</span>
              </Link>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-gray-400 cursor-not-allowed">
                <FaClipboardCheck />
                Assessment
              </span>
            )}
          </li>
          <li>
            <Link
              href="/pages/history"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:bg-blue-200 transition-transform duration-300 transform hover:scale-105"
            >
              <FaHistory className="text-blue-800" />
              <span className="font-semibold">History</span>
            </Link>
          </li>
          <li>
            <Link
              href="/pages/learnmore"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:bg-blue-200 transition-transform duration-300 transform hover:scale-105"
            >
              <FaInfoCircle className="text-blue-800" />
              <span className="font-semibold">Learn</span>
            </Link>
          </li>
          <li>
            <Link
              href="/pages/resources"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:bg-blue-200 transition-transform duration-300 transform hover:scale-105"
            >
              <FaBook className="text-blue-800" />
              <span className="font-semibold">Resources</span>
            </Link>
          </li>

          {/* Profile/Login */}
          {fullName ? (
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:bg-blue-200 transition-transform duration-300 transform hover:scale-105"
              >
                <FaUserCircle className="text-blue-800" />
                <span className="font-semibold">Profile</span>
              </button>

              {isProfileDropdownVisible && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md w-48 py-2 animate-fade-in z-50">
                  <div className="px-4 py-2 text-gray-700 border-b">{fullName}</div>
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
                href="/sign"
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:bg-blue-200 transition-transform duration-300 transform hover:scale-105"
              >
                <FaSignInAlt className="text-blue-800" />
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
