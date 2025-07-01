"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { IoArrowBack } from "react-icons/io5";

interface Result {
  id: string;
  total_score: number;
  severity: string;
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

  // 🔐 Redirect if not logged in
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      router.push("/sign");
    }
  }, [router]);

  // 🔄 Fetch user results
  useEffect(() => {
    const fetchResults = async () => {
      const username = sessionStorage.getItem("username");
      if (!username) return;

    };

    fetchResults();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* 🔙 Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <IoArrowBack className="mr-2" size={20} />
          
        </button>
      </div>

      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        Your Past PHQ-9 Assessments
      </h1>

      {loading ? (
        <p>Loading results...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-600">You haven’t taken any assessments yet.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((result) => (
            <li
              key={result.id}
              className="p-4 bg-gray-100 rounded shadow-sm space-y-1"
            >
              <p>
                <strong>Date:</strong>{" "}
                
              </p>
              <p>
                <strong>Total Score:</strong> {result.total_score}
              </p>
              <p>
                <strong>Severity:</strong> {result.severity}
              </p>
              <p className="text-sm italic text-gray-600">
                {getAdvice(result.severity)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
