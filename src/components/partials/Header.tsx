"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const toggleProfileDropdown = () =>
    setIsProfileDropdownVisible((prev) => !prev);

  useEffect(() => {
    const savedUsername = sessionStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    setUsername(null);
    window.location.href = "/sign"; // Redirect to sign-in page
  };

  return (
    <header className="relative z-50 flex justify-between items-center h-16 bg-blue-100 px-6 shadow-md">
      <div className="flex items-center gap-4">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/images/Mentalhealth.png"
              alt="E-DepCheck Logo"
              width={40}
              height={40}
            />
            <span className="font-semibold text-lg text-blue-900">E-DepCheck</span>
          </div>
        </Link>
      </div>

      <nav className="flex items-center">
        <ul className="flex gap-6 items-center text-blue-900 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/pages/questionnaire">Take Assessment</Link>
          </li>
          <li>
            <Link href="/pages/history">History</Link>
          </li>
          <li>
            <Link href="/pages/learn">Learn More</Link>
          </li>
          <li>
            <Link href="/pages/resources">Resources</Link>
          </li>

          {username ? (
            <li className="relative">
              <button
                className="cursor-pointer"
                onClick={toggleProfileDropdown}
              >
                Profile
              </button>

              {isProfileDropdownVisible && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-md w-48 py-2 z-50">
                  <div className="px-4 py-2 text-gray-700 border-b">
                    <span>{username}</span>
                  </div>
                  <div className="px-4 py-2">
                    <button
                      onClick={handleLogout}
                      className="text-blue-600 hover:underline w-full text-left"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link href="/sign">Sign In</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
