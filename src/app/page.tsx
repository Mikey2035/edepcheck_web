"use client";

import React from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div
        className="flex items-center justify-center min-h-screen bg-[#FAF6E3]"
        style={{
          backgroundImage: 'url("/images/Brainicon.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-center py-16 px-4 bg-white/70 rounded-lg shadow-lg max-w-3xl">
          <div className="mb-6">
            <img
              src="/images/Brainicon.png"
              alt="E-DepCheck Logo"
              className="mx-auto w-24 h-24 sm:w-32 sm:h-32 object-contain"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            E-DEPCHECK PHQ-9 DEPRESSION ASSESSMENT
          </h1>
          <p className="text-lg sm:text-xl text-black mb-6">
            Your Mental Health Matters
          </p>

          <Link href="/pages/questionnaire">
            <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition text-lg font-medium">
              Take the Assessment
            </button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
