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
import { FaListOl, FaUserGraduate } from "react-icons/fa";
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
                Common mental health concerns may include mood changes,
                withdrawal from activities, trouble sleeping or concentrating,
                and physical complaints without clear cause. Triggers can range
                from life stressors and trauma to biological or environmental
                factors.
              </p>
            </div>

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
                Early identification of mental health concerns allows for better
                outcomes. Addressing signs early leads to timely support,
                reduces stigma, and promotes better emotional and psychological
                well-being.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2 text-blue-600 font-bold text-lg">
                <MdInfoOutline
                  size={28}
                  className="group-hover:scale-125 transition-transform"
                />
                <h2>About E-MINDCHECK</h2>
              </div>
              <p className="text-gray-700 text-base flex items-center gap-2">
                <FaListOl className="text-green-500" />
                E-MINDCHECK is a digital tool designed to assess your current
                mental health status. It helps provide insight into your
                emotional well-being by evaluating various psychological
                indicators through a structured set of questions.
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
                <li>0–4: Minimal or no mental health concerns</li>
                <li>5–9: Mild level of concern</li>
                <li>10–14: Moderate concern, monitor closely</li>
                <li>15–19: Moderately high concern, seek support</li>
                <li>
                  20–27: Severe concern, professional attention recommended
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#FFB3B3] py-8 text-center text-sm text-gray-800 border-t border-red-300">
        <p className="mb-4 font-semibold text-base">Developed by</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-base font-medium">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/images/kate.png"
              alt="Kate Lorreine M. Colot"
              width={120}
              height={120}
              className="rounded-full"
            />
            <div className="flex items-center gap-2">
              <FaUserGraduate className="text-purple-700" />
              Kate Lorreine M. Colot
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/images/melfie.png"
              alt="Melfie James I. Antonio"
              width={120}
              height={120}
              className="rounded-full"
            />
            <div className="flex items-center gap-2">
              <FaUserGraduate className="text-purple-700" />
              Melfie James I. Antonio
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/images/earl.png"
              alt="Earl Mike A. Romanillos"
              width={120}
              height={120}
              className="rounded-full"
            />
            <div className="flex items-center gap-2">
              <FaUserGraduate className="text-purple-700" />
              Earl Mike A. Romanillos
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
