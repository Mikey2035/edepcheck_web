"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  FaHeartbeat,
  FaPhone,
  FaExternalLinkAlt,
  FaInfoCircle,
} from "react-icons/fa";
import Image from "next/image";
import Header from "@/components/partials/Header";

// ✅ Mental health hotlines data
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
  {
    title: "Prescription Psychiatrists and Psychologists",
    url: "", // No URL provided
    description:
      "Professional psychiatric and psychological services located at Centuria Medical Makati. Visit or call for appointments.",
    phone: ["0288630655", "09777953097"],
  },
  {
    title: "HOPELINE Philippines",
    url: "", // No URL provided
    description:
      "24/7 crisis support hotline by Natasha Goulbourn Foundation in partnership with DOH and Globe Telecom.",
    phone: ["0288044673", "09175584673", "09188784673"],
  },
];

// ✅ You may customize these images
const resourceImages = [
  "/images/s.png",
  "/images/s.png",
  "/images/s.png",
  "/images/s.png",
  "/images/s.png",
  "/images/s.png",
];

export default function HotlinePage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FFF3B0] py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-[#2C1E4A] leading-tight mb-8 flex items-center gap-2">
            <FaHeartbeat className="text-red-600" />
            Mental Health Hotlines (🇵🇭)
          </h1>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
            {resources.map((res, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-blue-100 flex flex-col gap-4"
              >
                <div className="flex items-center gap-4 mb-2">
                  <Image
                    src={resourceImages[index % resourceImages.length]}
                    alt={res.title}
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-blue-200 shadow"
                  />
                  <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                    <FaHeartbeat className="text-red-500 animate-pulse" />
                    {res.title}
                  </h2>
                </div>
                <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-blue-400" />
                  {res.description}
                </p>
                <div className="mt-2 flex flex-col gap-2">
                  {(Array.isArray(res.phone) ? res.phone : [res.phone]).map(
                    (phone, i) => (
                      <a
                        key={i}
                        href={`tel:${phone}`}
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow"
                      >
                        <FaPhone />
                        Call {phone}
                      </a>
                    )
                  )}
                  {res.url && (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:underline font-semibold"
                    >
                      <FaExternalLinkAlt />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
