"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/configs/firebase";

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

export default function QuestionnairePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(Array(9).fill(-1));
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [severity, setSeverity] = useState("");

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
    setSubmitted(true);

    try {
      await addDoc(collection(db, "phq9_results"), {
        username,
        total_score: total,
        severity: level,
        created_at: Timestamp.now(),
      });

      console.log("PHQ-9 result saved to Firestore!");
    } catch (err) {
      console.error("Error saving to Firestore:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
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

      {submitted && (
        <div className="mt-6 bg-green-100 p-4 rounded">
          <p className="text-lg">Your total score: <strong>{score}</strong></p>
          <p>Your depression level: <strong>{severity}</strong></p>
        </div>
      )}
    </div>
  );
}
