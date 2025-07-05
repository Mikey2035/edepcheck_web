"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdPsychology,
  MdHealthAndSafety,
  MdSupportAgent,
  MdInfoOutline,
} from "react-icons/md";
import { FaListOl } from "react-icons/fa";
import Header from "@/components/partials/Header";

export default function LearnMorePage() {
  return (
    <>
      <Header />
      <div className="bg-[#FFB3B3] min-h-screen py-10 px-4 flex items-center justify-center">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-center justify-center">
          {/* Left: Banner Image */}
          <div className="w-full md:w-1/2 h-72 md:h-[32rem] relative rounded-2xl overflow-hidden shadow-xl border-2 border-blue-200 flex-shrink-0">
            <Image
              src="/images/qqq.png"
              alt="Learn More Banner"
              fill
              className="object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
          {/* Right: Details */}
          <div className="flex-1 flex flex-col gap-8">
            <Link href="/symptomscauses">
              <div className="bg-white p-8 rounded-2xl shadow-lg cursor-pointer hover:bg-blue-50 hover:scale-105 transition-all duration-300 border border-blue-100 group">
                <div className="flex items-center gap-3 mb-2 text-purple-700 font-bold text-lg">
                  <MdPsychology
                    size={28}
                    className="group-hover:scale-125 transition-transform"
                  />
                  <h2>Symptoms and Causes</h2>
                </div>
                <p className="text-gray-700 text-base flex items-center gap-2">
                  <MdInfoOutline className="text-blue-400" />
                  Common symptoms include persistent sadness, loss of interest,
                  fatigue, changes in sleep or appetite, and difficulty
                  concentrating. Causes can be biological, psychological, or
                  environmental, such as genetics, trauma, or chronic stress.
                </p>
              </div>
            </Link>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2 text-red-600 font-bold text-lg">
                <MdHealthAndSafety
                  size={28}
                  className="group-hover:scale-125 transition-transform"
                />
                <h2>Importance of Early Detection</h2>
              </div>
              <p className="text-gray-700 text-base flex items-center gap-2">
                <MdInfoOutline className="text-blue-400" />
                Early detection and intervention are crucial to prevent
                depression from becoming more severe. It helps individuals seek
                appropriate support and treatment, improving their quality of
                life and overall well-being.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2 text-blue-600 font-bold text-lg">
                <MdInfoOutline
                  size={28}
                  className="group-hover:scale-125 transition-transform"
                />
                <h2>About the PHQ-9</h2>
              </div>
              <p className="text-gray-700 text-base flex items-center gap-2">
                <FaListOl className="text-green-500" />
                The PHQ-9 (Patient Health Questionnaire-9) is a
                self-administered tool used to screen, diagnose, monitor, and
                measure the severity of depression. It is a reliable measure
                based on the diagnostic criteria for major depressive disorder
                in the DSM-IV.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2 text-green-600 font-bold text-lg">
                <FaListOl
                  size={24}
                  className="group-hover:scale-125 transition-transform"
                />
                <h2>Scoring Guide</h2>
              </div>
              <ul className="text-base text-gray-700 ml-4 space-y-1 list-disc">
                <li>0–4: Minimal or no depression</li>
                <li>5–9: Mild depression</li>
                <li>10–14: Moderate depression</li>
                <li>15–19: Moderately severe depression</li>
                <li>20–27: Severe depression</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
