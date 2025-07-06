"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { FaClipboardList, FaInfoCircle } from "react-icons/fa";
import clsx from "clsx";

const Home: React.FC = () => {
  const [examCode, setExamCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<"red" | "blue" | null>(null);

  useEffect(() => {
    const fetchLatestExam = async () => {
      try {
        const res = await fetch("/api/exams?latest=true");
        const data = await res.json();
        if (data && data.exam_code) {
          setExamCode(data.exam_code);
        }
      } catch (err) {
        console.error("Failed to fetch latest exam:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestExam();
  }, []);

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col lg:flex-row transition-all duration-700 w-full max-w-none">
        {/* LEFT IMAGE - RED */}
        <div
          className={clsx(
            "bg-[#FFB3B3] flex items-center justify-center p-0 transition-all duration-700 overflow-hidden",
            hovered === "blue" && "w-0 min-w-0 opacity-0 pointer-events-none",
            hovered === "red" && "w-full lg:w-1/2",
            !hovered && "w-full lg:w-1/3"
          )}
          onMouseEnter={() => setHovered("red")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          {hovered !== "blue" && (
            <img
              src="/images/we.png"
              alt="Left Illustration"
              className="w-full max-w-sm drop-shadow-2xl rounded-xl transition-transform duration-500 ease-in-out"
            />
          )}
        </div>

        {/* CENTER CONTENT - YELLOW */}
        <div
          className={clsx(
            "bg-[#FFF3B0] flex flex-col items-center justify-center px-0 py-12 text-black text-center transition-all duration-700",
            hovered === "red" && "w-full lg:w-1/2",
            hovered === "blue" && "w-full lg:w-1/2",
            !hovered && "w-full lg:w-1/3"
          )}
        >
          <div className="w-full max-w-md">
            <div className="relative w-full flex justify-center items-center mb-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold z-10">
                E-DEPCHECK PHQ-9
              </h1>
              {/* Enhanced Animated Bubbles */}
              <span className="absolute left-0 top-2 w-6 h-6 bg-[#3A86FF] rounded-full opacity-70 animate-bubble1" />
              <span className="absolute right-0 top-0 w-4 h-4 bg-[#FF595E] rounded-full opacity-60 animate-bubble2" />
              <span className="absolute left-1/2 -bottom-2 w-3 h-3 bg-[#FFCA3A] rounded-full opacity-80 animate-bubble3" />
              <span className="absolute left-10 -top-4 w-5 h-5 bg-[#6C63FF] rounded-full opacity-50 animate-bubble4" />
              <span className="absolute right-10 -top-3 w-3.5 h-3.5 bg-[#3A86FF] rounded-full opacity-60 animate-bubble5" />
              <span className="absolute left-1/4 top-8 w-2.5 h-2.5 bg-[#FF595E] rounded-full opacity-70 animate-bubble6" />
              <span className="absolute right-1/4 top-10 w-4 h-4 bg-[#FFCA3A] rounded-full opacity-80 animate-bubble7" />
              <span className="absolute left-1/3 -bottom-4 w-3 h-3 bg-[#6C63FF] rounded-full opacity-60 animate-bubble8" />
              <span className="absolute right-1/3 -bottom-3 w-2 h-2 bg-white rounded-full opacity-50 animate-bubble9" />
              <span className="absolute left-8 top-12 w-4 h-4 bg-[#3A86FF] rounded-full opacity-60 animate-bubble10" />
              <span className="absolute right-8 top-14 w-3 h-3 bg-[#FF595E] rounded-full opacity-70 animate-bubble11" />
              <span className="absolute left-1/2 top-16 w-2.5 h-2.5 bg-[#FFCA3A] rounded-full opacity-80 animate-bubble12" />
              <style jsx>{`
                @keyframes bubble1 {
                  0% {
                    transform: translateY(0) scale(1);
                  }
                  50% {
                    transform: translateY(-12px) scale(1.1);
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
                    transform: translateY(-8px) scale(1.2);
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
                    transform: translateY(-6px) scale(1.15);
                  }
                  100% {
                    transform: translateY(0) scale(1);
                  }
                }
                @keyframes bubble4 {
                  0% {
                    transform: translateY(0) scale(1);
                  }
                  50% {
                    transform: translateY(-10px) scale(1.05);
                  }
                  100% {
                    transform: translateY(0) scale(1);
                  }
                }
                @keyframes bubble5 {
                  0% {
                    transform: translateY(0) scale(1);
                  }
                  50% {
                    transform: translateY(-7px) scale(1.18);
                  }
                  100% {
                    transform: translateY(0) scale(1);
                  }
                }
                @keyframes bubble6 {
                  0% {
                    transform: translateY(0) scale(1);
                  }
                  50% {
                    transform: translateY(-5px) scale(1.12);
                  }
                  100% {
                    transform: translateY(0) scale(1);
                  }
                }
                @keyframes bubble7 {
                  0% {
                    transform: translateY(0) scale(1);
                  }
                  50% {
                    transform: translateY(-9px) scale(1.09);
                  }
                  100% {
                    transform: translateY(0) scale(1);
                  }
                }
                @keyframes bubble8 {
                  0% {
                    transform: translateY(0) scale(1);
                  }
                  50% {
                    transform: translateY(-8px) scale(1.15);
                  }
                  100% {
                    transform: translateY(0) scale(1);
                  }
                }
                @keyframes bubble9 {
                  0% {
                    transform: translateY(0) scale(1);
                  }
                  50% {
                    transform: translateY(-4px) scale(1.2);
                  }
                  100% {
                    transform: translateY(0) scale(1);
                  }
                }
                @keyframes bubble10 {
                  0% {
                    transform: translateY(0) scale(1);
                  }
                  50% {
                    transform: translateY(-11px) scale(1.13);
                  }
                  100% {
                    transform: translateY(0) scale(1);
                  }
                }
                @keyframes bubble11 {
                  0% {
                    transform: translateY(0) scale(1);
                  }
                  50% {
                    transform: translateY(-6px) scale(1.09);
                  }
                  100% {
                    transform: translateY(0) scale(1);
                  }
                }
                @keyframes bubble12 {
                  0% {
                    transform: translateY(0) scale(1);
                  }
                  50% {
                    transform: translateY(-8px) scale(1.17);
                  }
                  100% {
                    transform: translateY(0) scale(1);
                  }
                }
                .animate-bubble1 {
                  animation: bubble1 2.5s infinite ease-in-out;
                }
                .animate-bubble2 {
                  animation: bubble2 2.2s infinite ease-in-out;
                }
                .animate-bubble3 {
                  animation: bubble3 2.8s infinite ease-in-out;
                }
                .animate-bubble4 {
                  animation: bubble4 3.1s infinite ease-in-out;
                }
                .animate-bubble5 {
                  animation: bubble5 2.7s infinite ease-in-out;
                }
                .animate-bubble6 {
                  animation: bubble6 2.3s infinite ease-in-out;
                }
                .animate-bubble7 {
                  animation: bubble7 2.9s infinite ease-in-out;
                }
                .animate-bubble8 {
                  animation: bubble8 2.6s infinite ease-in-out;
                }
                .animate-bubble9 {
                  animation: bubble9 2.4s infinite ease-in-out;
                }
                .animate-bubble10 {
                  animation: bubble10 2.8s infinite ease-in-out;
                }
                .animate-bubble11 {
                  animation: bubble11 2.5s infinite ease-in-out;
                }
                .animate-bubble12 {
                  animation: bubble12 2.7s infinite ease-in-out;
                }
              `}</style>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
              Depression Assessment
            </h2>
            <p className="text-lg sm:text-xl font-medium mb-8">
              Your Mental Health Matters 🧠
            </p>

            <div className="flex flex-col gap-4 items-center">
              {loading ? (
                <button
                  disabled
                  className="flex items-center gap-2 bg-gray-400 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md"
                >
                  ⏳ Loading...
                </button>
              ) : examCode ? (
                <Link href={`/pages/questionnaire?exam=${examCode}`}>
                  <button className="flex items-center justify-center gap-2 bg-white text-[#FF595E] hover:bg-gray-100 px-6 py-3 rounded-full text-lg font-semibold shadow-md transition transform hover:scale-105 duration-300">
                    <FaClipboardList />
                    Take Assessment
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="bg-gray-400 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md"
                >
                  🚫 No Active Exam
                </button>
              )}

              <Link href="/pages/learnmore">
                <button className="flex items-center justify-center gap-2 border border-black px-6 py-3 rounded-md text-lg font-semibold transition transform hover:scale-105 hover:bg-black hover:text-white duration-300 mt-2">
                  <FaInfoCircle />
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE - BLUE */}
        <div
          className={clsx(
            "bg-[#A3D8F4] flex items-center justify-center p-0 transition-all duration-700 overflow-hidden",
            hovered === "red" && "w-0 min-w-0 opacity-0 pointer-events-none",
            hovered === "blue" && "w-full lg:w-1/2",
            !hovered && "w-full lg:w-1/3"
          )}
          onMouseEnter={() => setHovered("blue")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          {hovered !== "red" && (
            <img
              src="/images/qw.png"
              alt="Right Illustration"
              className="w-full max-w-sm drop-shadow-2xl rounded-xl transition-transform duration-500 ease-in-out"
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
