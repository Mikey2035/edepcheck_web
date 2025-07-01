"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaHeartbeat, FaPhone, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";

const resources = [
  {
    title: "NCMH Crisis Hotline",
    url: "https://ncmh.gov.ph/",
    description:
      "Call 1553 for 24/7 free and confidential mental health support.",
    phone: "1553",
  },
  {
    title: "MentalHealthPH",
    url: "https://mentalhealthph.org/",
    description: "Advocacy group for mental health awareness and support.",
    phone: "+639178998727",
  },
  {
    title: "Tawag Paglaum - Centro Bisaya",
    url: "https://www.facebook.com/people/Tawag-Paglaum-Centro-Bisaya/100068862624004/",
    description:
      "24/7 helpline for individuals struggling with emotional and suicidal thoughts.",
    phone: "+639664679626",
  },
  {
    title: "In Touch: Crisis Line",
    url: "https://in-touch.org/",
    description:
      "Crisis lines for relationship problems, addiction, abuse, and emotional distress.",
    phone: "+639190560709",
  },
];

export default function ResourcesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="mb-6 inline-flex items-center text-blue-600 hover:underline"
        >
          <FaArrowLeft className="mr-2" />
          
        </button>

        <h1 className="text-3xl font-bold text-blue-800 mb-8 flex items-center gap-2">
          <FaHeartbeat className="text-red-600" />
          Mental Health Resources (🇵🇭)
        </h1>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {resources.map((res, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {res.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2">{res.description}</p>

              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={`tel:${res.phone}`}
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  <FaPhone />
                  Call Now
                </a>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FaExternalLinkAlt />
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
