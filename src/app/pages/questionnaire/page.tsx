"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading or watching TV",
  "Moving or speaking so slowly that others could have noticed? Or the opposite — being so fidgety or restless that you’ve been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way",
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

const getSeverity = (score: number) => {
  if (score <= 4) return "Minimal depression";
  if (score <= 9) return "Mild depression";
  if (score <= 14) return "Moderate depression";
  if (score <= 19) return "Moderately severe depression";
  return "Severe depression";
};

const getAdvice = (severity: string) => {
  if (severity === "Minimal depression" || severity === "Mild depression") {
    return "You may seek guidance from our admin team.";
  }
  return "It is recommended to consult a mental health professional.";
};

export default function QuestionnairePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(Array(9).fill(-1));
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [severity, setSeverity] = useState("");
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      router.push("/sign");
    }
  }, [router]);

  const handleChange = (qIndex: number, value: number) => {
    const updated = [...answers];
    updated[qIndex] = value;
    setAnswers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (answers.includes(-1)) {
      setError("Please answer all questions.");
      return;
    }

    const total = answers.reduce((acc, curr) => acc + curr, 0);
    const level = getSeverity(total);
    const username = sessionStorage.getItem("username") || "Anonymous";

    setScore(total);
    setSeverity(level);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 relative">
      <div className="flex items-center mb-4">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <IoArrowBack className="mr-2" size={20} />
          
        </button>
      </div>

      <h1 className="text-2xl font-bold text-blue-800 mb-4">PHQ-9 Depression Assessment</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, idx) => (
          <div key={idx}>
            <p className="font-medium">{idx + 1}. {question}</p>
            <div className="flex gap-4 mt-2">
              {options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    value={opt.value}
                    checked={answers[idx] === opt.value}
                    onChange={() => handleChange(idx, opt.value)}
                    required
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        ))}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-blue-700 mb-2">Your Assessment Result</h2>
            <p><strong>Total Score:</strong> {score}</p>
            <p><strong>Severity:</strong> {severity}</p>
            <p className="mt-2 text-sm italic text-gray-700">{getAdvice(severity)}</p>

            {["Moderate depression", "Moderately severe depression", "Severe depression"].includes(severity) && (
              <div className="mt-4 text-sm text-blue-700">
                <p className="font-semibold mb-1">Support Resources:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li><a href="https://www.facebook.com/DOHgovph/posts/3438694606180853/" target="_blank" className="underline">DOH Mental Health Hotline</a></li>
                  <li><a href="https://mentalhealthph.org/" target="_blank" className="underline">MentalHealthPH</a></li>
                  <li><a href="https://www.who.int/health-topics/mental-health" target="_blank" className="underline">WHO Mental Health Resources</a></li>
                </ul>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={() => router.push("/pages/history")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Go to History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
