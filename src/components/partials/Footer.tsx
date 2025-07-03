import React from "react";
import { FaBrain } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-100 text-blue-900 py-8 px-6 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-2">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2 mb-2">
          <FaBrain className="text-2xl text-[#2C1E4A]" />
          <h2 className="text-2xl font-black tracking-tight text-[#2C1E4A]">
            E-DepCheck
          </h2>
        </div>

        {/* Tagline */}
        <p className="text-base italic font-medium">
          "Your Mental Health Matters."
        </p>

        {/* Copyright */}
        <p className="text-sm text-blue-800 mt-2">
          &copy; 2025 E-DepCheck. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
