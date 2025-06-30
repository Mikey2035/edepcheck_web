// Mark Home as a Client Component
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
        

        
        <div className="relative z-10 text-center py-16">
          {/* Logo */}
          <div className="mb-6">
            <img
              src="/images/Brainicon.png"
              alt="E-DepCheck Logo"
              className="mx-auto w-24 h-24 sm:w-32 sm:h-32 object-contain"
            />
          </div>

          
          <h1 className="text-5xl font-bold text-black mb-4 ">E-DEPCHECK PHQ-9 DEPRESSION ASSESSMENT</h1>
          <p className="text-xl text-black mb-6">Your Mental Health Matters</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;