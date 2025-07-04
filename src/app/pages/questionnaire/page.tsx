"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

interface Choice {
  id: number;
  text: string;
  value: number;
}

interface Question {
  id: number;
  text: string;
  choices: Choice[];
}

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
  const searchParams = useSearchParams();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [severity, setSeverity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [examTitle, setExamTitle] = useState("");

  useEffect(() => {
    const fullName = sessionStorage.getItem("fullName");
    if (!fullName || fullName === "null" || fullName === "undefined") {
      router.push("/sign/login");
      return;
    }

    const exam_code = searchParams?.get("exam");
    if (!exam_code) {
      console.error("No exam code provided");
      return;
    }

    sessionStorage.setItem("examCode", exam_code);

    const fetchExamTitle = async () => {
      try {
        const res = await fetch(`/api/exams/info?exam_code=${exam_code}`);
        const data = await res.json();
        setExamTitle(data.title);
      } catch (err) {
        console.error("Error fetching exam info:", err);
      }
    };

    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/userquestions");
        const data = await res.json();
        setQuestions(data);
        setAnswers(Array(data.length).fill(-1));
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchExamTitle();
    fetchQuestions();
  }, [searchParams, router]);

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
    setScore(total);
    setSeverity(level);
    setShowModal(true);

    const fullName = sessionStorage.getItem("fullName");
    const examCode = sessionStorage.getItem("examCode");

    const answersDetails = questions.map((question, idx) => {
      const selectedChoice = question.choices.find(
        (c) => c.value === answers[idx]
      );
      return {
        questionId: question.id,
        choiceId: selectedChoice ? selectedChoice.id : null,
      };
    });

    try {
      await fetch("/api/submit-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          examCode,
          totalScore: total,
          severity: level,
          answers: answersDetails,
        }),
      });
    } catch (err) {
      console.error("Failed to submit response:", err);
    }
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

      <h1 className="text-2xl font-bold text-blue-800 mb-2">
        PHQ-9: {examTitle}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, idx) => (
          <div key={question.id}>
            <p className="font-medium">
              {idx + 1}. {question.text}
            </p>
            <div className="flex gap-4 mt-2">
              {question.choices.map((opt) => (
                <label key={opt.id} className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    value={opt.value}
                    checked={answers[idx] === opt.value}
                    onChange={() => handleChange(idx, opt.value)}
                    required
                  />
                  {opt.text}
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
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              Your Assessment Result
            </h2>
            <p>
              <strong>Total Score:</strong> {score}
            </p>
            <p>
              <strong>Severity:</strong> {severity}
            </p>
            <p className="mt-2 text-sm italic text-gray-700">
              {getAdvice(severity)}
            </p>

            {[
              "Moderate depression",
              "Moderately severe depression",
              "Severe depression",
            ].includes(severity) && (
              <div className="mt-4 text-sm text-blue-700">
                <p className="font-semibold mb-1">Support Resources:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    <a
                      href="https://www.facebook.com/DOHgovph/posts/3438694606180853/"
                      target="_blank"
                      className="underline"
                    >
                      DOH Mental Health Hotline
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://mentalhealthph.org/"
                      target="_blank"
                      className="underline"
                    >
                      MentalHealthPH
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.who.int/health-topics/mental-health"
                      target="_blank"
                      className="underline"
                    >
                      WHO Mental Health Resources
                    </a>
                  </li>
                </ul>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => router.push("/")}
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
