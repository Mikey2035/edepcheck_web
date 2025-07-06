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
  category_name: string;
  choices: Choice[];
}

const getSeverity = (score: number) => {
  if (score <= 4) return "Minimal depression or No Depression";
  if (score <= 9) return "Mild depression";
  if (score <= 14) return "Moderate depression";
  if (score <= 19) return "Moderately severe depression";
  return "Severe depression";
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
    if (!fullName) {
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
        const res = await fetch(`/api/userquestions?exam_code=${exam_code}`);
        const data = await res.json();

        const questionArray = Array.isArray(data)
          ? data
          : Array.isArray(data.questions)
          ? data.questions
          : [];

        if (!questionArray.length) {
          console.error("Invalid questions format:", data);
          setQuestions([]);
          return;
        }

        setQuestions(questionArray);
        setAnswers(Array(questionArray.length).fill(-1));
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

  let questionCounter = 0;

  return (
    <div className="w-screen min-h-screen bg-blue-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium"
          >
            <IoArrowBack size={20} />
            Back
          </button>
        </div>

        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          <span className="font-normal">{examTitle}</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {Object.entries(
            (Array.isArray(questions) ? questions : []).reduce(
              (acc: Record<string, Question[]>, question) => {
                if (!acc[question.category_name])
                  acc[question.category_name] = [];
                acc[question.category_name].push(question);
                return acc;
              },
              {}
            )
          ).map(([categoryName, categoryQuestions]) => (
            <div key={categoryName} className="mb-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b pb-1">
                {categoryName}
              </h2>

              {categoryQuestions.map((question) => {
                const globalIndex = questions.findIndex(
                  (q) => q.id === question.id
                );
                const displayIndex = ++questionCounter;

                return (
                  <div
                    key={question.id}
                    className="mb-6 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <p className="font-medium text-gray-800 mb-3">
                      {displayIndex}. {question.text}
                    </p>
                    <div className="grid gap-3">
                      {question.choices.map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-center justify-between border px-4 py-2 rounded-md cursor-pointer transition ${
                            answers[globalIndex] === opt.value
                              ? "bg-blue-100 border-blue-500 text-blue-800 font-semibold"
                              : "bg-gray-50 border-gray-300 hover:bg-blue-50"
                          }`}
                        >
                          <span>{opt.text}</span>
                          <input
                            type="radio"
                            name={`q-${globalIndex}`}
                            value={opt.value}
                            checked={answers[globalIndex] === opt.value}
                            onChange={() =>
                              handleChange(globalIndex, opt.value)
                            }
                            required
                            className="form-radio hidden"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium rounded-md transition"
            >
              Submit
            </button>
          </div>
        </form>

        {/* MODAL SECTION */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Your Assessment Result
              </h2>

              <p className="text-sm mb-1">
                <strong>Total Score:</strong> {score}
              </p>
              <p className="text-sm mb-4">
                <strong>Severity:</strong> {severity}
              </p>

              <div className="text-sm text-gray-800 space-y-3">
                <strong>What this means:</strong>
                <div className="space-y-2">
                  {severity === "Minimal depression or No Depression" && (
                    <>
                      <p>
                        Your responses suggest little to no signs of depression.
                      </p>
                      <p>
                        <strong>Common symptoms (if any):</strong> Occasional
                        sadness, mild fatigue, or stress that usually resolves
                        on its own.
                      </p>
                      <p>
                        <strong>What to do:</strong> Maintain your healthy
                        habits, stay socially connected, and keep monitoring
                        your mental well-being.
                      </p>
                    </>
                  )}

                  {severity === "Mild depression" && (
                    <>
                      <p>Your score indicates mild depression.</p>
                      <p>
                        <strong>Common symptoms:</strong> Feeling down, reduced
                        energy, mild sleep difficulties, or reduced enjoyment in
                        daily activities.
                      </p>
                      <p>
                        <strong>What to do:</strong> Engage in self-care
                        activities, talk to friends or family, exercise
                        regularly, and practice mindfulness. Seek support if
                        symptoms persist.
                      </p>
                    </>
                  )}

                  {severity === "Moderate depression" && (
                    <>
                      <p>You may be experiencing moderate depression.</p>
                      <p>
                        <strong>Common symptoms:</strong> Persistent sadness,
                        low motivation, social withdrawal, trouble sleeping or
                        overeating, and difficulty focusing.
                      </p>
                      <p>
                        <strong>What to do:</strong> Consider talking to a
                        mental health counselor or joining a support group.
                        Early intervention can help improve your well-being.
                      </p>
                    </>
                  )}

                  {severity === "Moderately severe depression" && (
                    <>
                      <p>Your score shows moderately severe depression.</p>
                      <p>
                        <strong>Common symptoms:</strong> Constant sadness,
                        hopelessness, fatigue, significant appetite or sleep
                        changes, and possible thoughts of self-harm.
                      </p>
                      <p>
                        <strong>What to do:</strong> Seek help from a licensed
                        mental health professional. Therapy, counseling, or
                        support groups can help you cope and recover.
                      </p>
                    </>
                  )}

                  {severity === "Severe depression" && (
                    <>
                      <p>
                        This score indicates severe depression, which is a
                        serious concern.
                      </p>
                      <p>
                        <strong>Common symptoms:</strong> Overwhelming sadness,
                        isolation, extreme fatigue, feelings of worthlessness,
                        and frequent thoughts of self-harm or suicide.
                      </p>
                      <p>
                        <strong>What to do:</strong> Please seek immediate
                        professional help. Contact a mental health crisis line
                        or visit a mental health clinic as soon as possible for
                        your safety.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {[
                "Moderate depression",
                "Moderately severe depression",
                "Severe depression",
              ].includes(severity) && (
                <div className="mt-6 text-sm text-blue-700">
                  <p className="font-semibold mb-2">
                    Recommended Support Resources:
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>
                      <a
                        href="https://www.facebook.com/DOHgovph/posts/3438694606180853/"
                        target="_blank"
                        className="underline"
                      >
                        DOH Mental Health Hotline (Philippines)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://mentalhealthph.org/"
                        target="_blank"
                        className="underline"
                      >
                        MentalHealthPH - Mental Health Support
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

              <div className="mt-6 flex justify-end gap-3">
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
    </div>
  );
}
