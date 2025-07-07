"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

interface Result {
  id: string;
  exam_code: string;
  total_score: number;
  severity: string;
  submitted_at: string;
}

const getAdvice = (severity: string) => {
  if (severity === "Minimal depression" || severity === "Mild depression") {
    return "You may seek guidance from our admin team.";
  }
  return "It is recommended to consult a mental health professional.";
};

export default function HistoryPage() {
  const router = useRouter();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fullName = sessionStorage.getItem("fullName");
    if (!fullName) {
      router.push("/sign/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchResults = async () => {
      const fullName = sessionStorage.getItem("fullName");
      if (!fullName) return;

      try {
        const response = await fetch(
          `/api/results?fullName=${encodeURIComponent(fullName)}`
        );
        if (!response.ok) throw new Error("Failed to fetch results");

        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="w-full h-screen bg-[#A3D8F4] px-6 py-10 overflow-y-auto">

      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="text-black hover:text-red-800 flex items-center text-sm font-medium"
        >
          <IoArrowBack className="mr-2" size={20} />
          Back
        </button>
      </div>

      <h1 className="text-3xl font-bold text-black mb-6">
        Your Past PHQ-9 Assessments
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading results...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          You haven’t taken any assessments yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((result) => (
            <div
              key={result.id}
              className="p-5 rounded-xl shadow-lg border-l-8 border-[#fcd116] bg-[#fffbea] hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500">
                  <strong>Date:</strong>{" "}
                  {new Date(result.submitted_at).toLocaleDateString()}
                </div>
                <FaCheckCircle className="text-[#c8272d]" size={18} />
              </div>
              <h3 className="text-lg font-semibold text-[#c8272d] mb-1">
                Exam Code: {result.exam_code}
              </h3>
              <p className="text-gray-800">
                <strong>Total Score:</strong> {result.total_score}
              </p>
              <p className="text-gray-800">
                <strong>Severity:</strong>{" "}
                <span className="font-semibold text-[#c8272d]">
                  {result.severity}
                </span>
              </p>
              <p className="text-sm italic text-gray-600 mt-2">
                {getAdvice(result.severity)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
