"use client";

import React from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen bg-[#B7E9F7] px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 max-w-6xl w-full group">
          {/* Text Section */}
          <div className="flex-1 text-center lg:text-left transition-all duration-300">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-[#2C1E4A] leading-tight mb-6 transform transition duration-300 group-hover:scale-105 group-hover:text-[#1f1532]">
              E-DEPCHECK PHQ-9<br className="hidden sm:block" /> DEPRESSION ASSESSMENT
            </h1>
            <p className="text-lg sm:text-xl text-[#3F3F3F] mb-8 max-w-lg mx-auto lg:mx-0 transform transition duration-300 group-hover:-translate-y-1 group-hover:opacity-90">
              Your Mental Health Matters
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/pages/questionnaire">
                <button className="flex items-center gap-2 bg-[#2C1E4A] hover:bg-[#1f1532] text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition transform hover:scale-105 duration-300">
                  <span>📋</span>
                  Take Assessment
                </button>
              </Link>
              <Link href="#learn-more">
                <button className="border border-black px-6 py-3 rounded-md text-lg font-semibold transition transform hover:scale-105 hover:bg-black hover:text-white duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex-1">
            <img
              src="/images/qq.png"
              alt="Illustration"
              className="w-full max-w-md mx-auto drop-shadow-xl transition transform hover:scale-105 duration-500 ease-in-out"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;