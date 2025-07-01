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

export default function LearnMorePage() {
  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="w-full h-48 relative rounded-lg overflow-hidden mb-8 shadow-md">
          <Image
            src="/images/Banner.jpg"
            alt="Learn More Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <Link href="/symptomscauses">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 cursor-pointer hover:bg-gray-50 transition">
            <div className="flex items-center gap-2 mb-2 text-purple-600 font-semibold">
              <MdPsychology size={22} />
              <h2 className="text-lg">Symptoms and Causes</h2>
            </div>
            <p className="text-gray-700 text-sm">
              Common symptoms include persistent sadness, loss of interest,
              fatigue, changes in sleep or appetite, and difficulty
              concentrating. Causes can be biological, psychological, or
              environmental, such as genetics, trauma, or chronic stress.
            </p>
          </div>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center gap-2 mb-2 text-red-600 font-semibold">
            <MdHealthAndSafety size={22} />
            <h2 className="text-lg">Importance of Early Detection</h2>
          </div>
          <p className="text-gray-700 text-sm">
            Early detection and intervention are crucial to prevent depression
            from becoming more severe. It helps individuals seek appropriate
            support and treatment, improving their quality of life and overall
            well-being.
          </p>
        </div>

        <Link href="/pages/resources">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 cursor-pointer hover:bg-gray-50 transition">
            <div className="flex items-center gap-2 mb-2 text-yellow-600 font-semibold">
              <MdSupportAgent size={22} />
              <h2 className="text-lg">Where to Get Help</h2>
            </div>
            <p className="text-gray-700 text-sm">
              If you're feeling overwhelmed, it's okay to ask for help. Tap here
              to view a list of mental health hotlines and support services
              available to you.
              <br />
              <br />
              Click here to get help.
            </p>
          </div>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center gap-2 mb-2 text-blue-600 font-semibold">
            <MdInfoOutline size={22} />
            <h2 className="text-lg">About the PHQ-9</h2>
          </div>
          <p className="text-gray-700 text-sm">
            The PHQ-9 (Patient Health Questionnaire-9) is a self-administered
            tool used to screen, diagnose, monitor, and measure the severity of
            depression. It is a reliable measure based on the diagnostic
            criteria for major depressive disorder in the DSM-IV.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-2 text-green-600 font-semibold">
            <FaListOl size={18} />
            <h2 className="text-lg">Scoring Guide</h2>
          </div>
          <ul className="text-sm text-gray-700 ml-4 space-y-1">
            <li>• 0–4: Minimal or no depression</li>
            <li>• 5–9: Mild depression</li>
            <li>• 10–14: Moderate depression</li>
            <li>• 15–19: Moderately severe depression</li>
            <li>• 20–27: Severe depression</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
