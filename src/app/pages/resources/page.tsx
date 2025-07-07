"use client";

import React, { useState } from "react";
import {
  FaHeartbeat,
  FaInfoCircle,
  FaLeaf,
  FaBed,
  FaWalking,
  FaAppleAlt,
  FaHandsHelping,
  FaLightbulb,
  FaSmile,
  FaComments,
  FaWineGlassAlt,
  FaExternalLinkAlt,
  FaDumbbell,
  FaUtensils,
  FaBeer,
  FaRunning,
  FaBook,
  FaBan,
  FaMedkit,
  FaBullseye,
  FaGrinStars,
  FaUsers,
} from "react-icons/fa";
import Header from "@/components/partials/Header";


const whoTips = [
  {
    title: "Talk to someone you trust",
    description:
      "Sharing your feelings can help relieve stress and build connection.",
    icon: <FaComments className="text-purple-600 text-3xl" />,
  },
  {
    title: "Look after your physical health",
    description:
      "Be active, eat well, and rest properly to support mental well-being.",
    icon: <FaRunning className="text-green-600 text-3xl" />,
  },
  {
    title: "Do activities you enjoy",
    description: "Engage in hobbies and fun activities to uplift your mood.",
    icon: <FaBook className="text-blue-600 text-3xl" />,
  },
  {
    title: "Steer away from harmful substances",
    description: "Avoid drugs and alcohol as coping mechanisms.",
    icon: <FaBan className="text-red-600 text-3xl" />,
  },
  {
    title: "Seek professional help",
    description: "Reach out to a mental health professional when needed.",
    icon: <FaMedkit className="text-yellow-600 text-3xl" />,
  },
];

const nimhTips = [
  {
    title: "Get regular exercise",
    description:
      "Physical activity, like walking, boosts your mood and health.",
    icon: <FaDumbbell className="text-green-600 text-3xl" />,
  },
  {
    title: "Eat healthy, regular meals and stay hydrated",
    description: "A balanced diet and hydration improve energy and focus.",
    icon: <FaUtensils className="text-red-600 text-3xl" />,
  },
  {
    title: "Make sleep a priority",
    description: "Getting enough quality sleep is essential for mental health.",
    icon: <FaBed className="text-blue-600 text-3xl" />,
  },
  {
    title: "Try a relaxing activity",
    description: "Incorporate wellness activities like meditation and hobbies.",
    icon: <FaGrinStars className="text-yellow-600 text-3xl" />,
  },
  {
    title: "Stay connected",
    description: "Maintain supportive relationships with friends and family.",
    icon: <FaUsers className="text-purple-600 text-3xl" />,
  },
];

const dohTips = [
  {
    title: "Exercise regularly",
    description: "Physical activity boosts your mood and overall well-being.",
    icon: <FaDumbbell className="text-green-600 text-3xl" />,
  },
  {
    title: "Eat healthy",
    description: "Maintain a balanced diet for a healthy body and mind.",
    icon: <FaUtensils className="text-red-600 text-3xl" />,
  },
  {
    title: "Get adequate sleep",
    description: "Proper rest helps recharge your body and mind.",
    icon: <FaBed className="text-blue-600 text-3xl" />,
  },
  {
    title: "Limit your alcohol intake",
    description:
      "Avoid excessive alcohol consumption for better mental clarity.",
    icon: <FaBeer className="text-yellow-600 text-3xl" />,
  },
  {
    title: "Talk about your feelings",
    description: "Opening up helps release emotional burdens.",
    icon: <FaComments className="text-purple-600 text-3xl" />,
  },
];

const mentalHealthFoundationTips = [
  {
    title: "Get closer to nature",
    description: "Nature can have a really calming effect on us.",
    icon: <FaLeaf className="text-green-600 text-3xl" />,
  },
  {
    title: "Get more from your sleep",
    description: "Good sleep makes a big difference to our minds and bodies.",
    icon: <FaBed className="text-blue-600 text-3xl" />,
  },
  {
    title: "Keep moving",
    description:
      "Looking after ourselves physically also helps our mental health.",
    icon: <FaWalking className="text-orange-600 text-3xl" />,
  },
  {
    title: "Eat healthy food",
    description: "Food and drink affect our mood and brain function.",
    icon: <FaAppleAlt className="text-red-600 text-3xl" />,
  },
  {
    title: "Talk to someone you trust for support",
    description: "Sharing your struggles takes courage but is helpful.",
    icon: <FaComments className="text-blue-500 text-3xl" />,
  },
];

const healthTips = [
  {
    title: "Tips for Good Mental Health from DOH",
    description:
      "Tap to view essential mental health practices recommended by DOH.",
    icon: <FaHandsHelping className="text-yellow-600 text-4xl" />,
    modalKey: "dohModal",
  },
  {
    title: "Mental Health Foundation UK Tips",
    description:
      "Tap to view helpful mental health practices from the Mental Health Foundation.",
    icon: <FaLeaf className="text-green-600 text-4xl" />,
    modalKey: "mhfModal",
  },
  {
    title: "WHO: Mental Health and Well-being Tips",
    description:
      "Tap to view practical mental health tips from the World Health Organization.",
    icon: <FaHeartbeat className="text-red-600 text-4xl" />,
    modalKey: "whoModal",
  },
  {
    title: "NIMH: Caring for Your Mental Health",
    description:
      "Tap to view helpful practices from the National Institute of Mental Health.",
    icon: <FaHeartbeat className="text-pink-600 text-4xl" />,
    modalKey: "nimhModal",
  },
];

export default function ResourcesPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FFF3B0] py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-[#2C1E4A] leading-tight mb-8 flex items-center gap-2">
            <FaHeartbeat className="text-red-600" />
            Mental Health Resources
          </h1>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
            {healthTips.map((tip, index) => (
              <div
                key={index}
                onClick={() => setActiveModal(tip.modalKey)}
                className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-blue-100 flex flex-col gap-4"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="rounded-full border-2 border-blue-200 shadow p-3 bg-blue-50">
                    {tip.icon}
                  </div>
                  <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                    <FaHeartbeat className="text-red-500 animate-pulse" />
                    {tip.title}
                  </h2>
                </div>
                <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-blue-400" />
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHO Tips Modal */}
      {activeModal === "whoModal" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#2C1E4A] flex items-center gap-2">
              <FaHeartbeat className="text-red-600" />
              WHO: Mental Health and Well-being Tips
            </h2>

            <div className="flex flex-col gap-4">
              {whoTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded-full border border-blue-200">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a
                href="https://www.who.int/westernpacific/about/how-we-work/pacific-support/news/detail/07-10-2021-6-ways-to-take-care-of-your-mental-health-and-well-being-this-world-mental-health-day"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline text-base font-semibold"
              >
                <FaExternalLinkAlt />
                View More Tips from WHO
              </a>
            </div>
          </div>
        </div>
      )}

      {/* NIMH Tips Modal */}
      {activeModal === "nimhModal" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#2C1E4A] flex items-center gap-2">
              <FaHeartbeat className="text-red-600" />
              NIMH: Caring for Your Mental Health
            </h2>

            <div className="flex flex-col gap-4">
              {nimhTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded-full border border-blue-200">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a
                href="https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline text-base font-semibold"
              >
                <FaExternalLinkAlt />
                View More Tips from NIMH
              </a>
            </div>
          </div>
        </div>
      )}

      {/* DOH Tips Modal */}
      {activeModal === "dohModal" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#2C1E4A] flex items-center gap-2">
              <FaHeartbeat className="text-red-600" />
              Tips for Good Mental Health from DOH
            </h2>

            <div className="flex flex-col gap-4">
              {dohTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded-full border border-blue-200">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a
                href="https://caro.doh.gov.ph/tips-for-a-good-mental-health/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline text-base font-semibold"
              >
                <FaExternalLinkAlt />
                View More Tips from DOH
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mental Health Foundation UK Modal */}
      {activeModal === "mhfModal" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#2C1E4A] flex items-center gap-2">
              <FaHeartbeat className="text-red-600" />
              Mental Health Foundation UK Tips
            </h2>

            <div className="flex flex-col gap-4">
              {mentalHealthFoundationTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded-full border border-blue-200">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a
                href="https://www.mentalhealth.org.uk/explore-mental-health/publications/our-best-mental-health-tips"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline text-base font-semibold"
              >
                <FaExternalLinkAlt />
                View More Tips from Mental Health Foundation
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
