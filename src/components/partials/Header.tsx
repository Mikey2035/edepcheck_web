"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const savedFullName = sessionStorage.getItem("fullName");
    if (savedFullName) {
      setFullName(savedFullName);
    }
  }, []);

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
          <li><Link href="/">Home</Link></li>
          <li><Link href="/pages/questionnaire">Take Assessment</Link></li>
          <li><Link href="/pages/history">History</Link></li>
          <li><Link href="/pages/learnmore">Learn More</Link></li>
          <li><Link href="/pages/resources">Resources</Link></li>

          {fullName ? (
            <li>
              <Link href="/pages/profile">
                <span className="cursor-pointer hover:underline">Profile</span>
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/sign/login">Sign In</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
