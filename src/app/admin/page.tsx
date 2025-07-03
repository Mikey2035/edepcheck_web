"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Exam {
  exam_code: string;
  title: string;
  severity: string;
  total_examinees: number;
  exam_date: string;
}

const AdminExamTable = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [values, setValues] = useState([0, 0, 0, 0]);
  const [questionsData, setQuestionsData] = useState<any[]>([]);

  useEffect(() => {
    fetchExams();
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/questions");
      const data = await response.json();

      const grouped = data.reduce((acc: any, curr: any) => {
        const key = curr.question_id;
        if (!acc[key]) {
          acc[key] = {
            category: curr.category_name,
            question: curr.question_text,
            choices: [],
          };
        }
        acc[key].choices.push({
          text: curr.choice_text,
          value: curr.choice_value,
        });
        return acc;
      }, {});

      setQuestionsData(Object.values(grouped));
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await fetch("/api/exams");
      const data = await response.json();
      setExams(data);
    } catch (err) {
      console.error("Failed to fetch exams:", err);
    }
  };

  const handleAddExam = async () => {
  if (!title || !date) return;

  const formattedDate = new Date(date);
  const exam_code = formattedDate.toISOString().slice(0, 10).replace(/-/g, "");

  const newExam = {
    exam_code,
    title,
    severity: "Pending",
    total_examinees: 0,
    exam_date: formattedDate.toISOString().slice(0, 10),
  };

  try {
    const res = await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExam),
    });

    if (!res.ok) throw new Error("Failed to add exam");

    setTitle("");
    setDate("");
    setShowModal(false);
    fetchExams();

    // ✅ Store examCode in sessionStorage
    sessionStorage.setItem("examCode", exam_code);

  } catch (err) {
    console.error("Error adding exam:", err);
  }
};


  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/sign/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Examinations</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Exam
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Exam Code</th>
                <th className="border px-4 py-2">Examination Title</th>
                <th className="border px-4 py-2">Severity</th>
                <th className="border px-4 py-2">Total Examinees</th>
                <th className="border px-4 py-2">Exam Date</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{exam.exam_code}</td>
                  <td className="border px-4 py-2 ">
                    <Link href={`/admin/examinees/${exam.exam_code}`}>
                      {exam.title}
                    </Link>
                  </td>
                  <td className="border px-4 py-2">{exam.severity}</td>
                  <td className="border px-4 py-2">{exam.total_examinees}</td>
                  <td className="border px-4 py-2">{exam.exam_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Questions Table Section */}
        <div className="mt-10">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-semibold">Mental Health Questions</h3>
    <button
      onClick={() => setShowQuestionModal(true)}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Add Question
    </button>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full border border-gray-300 table-auto">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Category</th>
          <th className="border px-4 py-2">Question</th>
          <th className="border px-4 py-2">Choice</th>
          <th className="border px-4 py-2">Value</th>
        </tr>
      </thead>
      <tbody>
        {questionsData.map((q, idx) => (
          q.choices.map((choice: any, i: number) => (
            <tr key={`${idx}-${i}`}>
              {i === 0 && (
                <>
                  <td className="border px-4 py-2" rowSpan={q.choices.length}>{q.category}</td>
                  <td className="border px-4 py-2" rowSpan={q.choices.length}>{q.question}</td>
                </>
              )}
              <td className="border px-4 py-2">{choice.text}</td>
              <td className="border px-4 py-2">{choice.value}</td>
            </tr>
          ))
        ))}
      </tbody>
    </table>
  </div>
</div>


      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add Examination</h3>

            <div className="mb-4">
              <label className="block mb-1 text-sm">Examination Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm">Exam Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExam}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showQuestionModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      <h3 className="text-xl font-semibold mb-4">Add Mental Health Question</h3>

      <div className="mb-4">
  <label className="block mb-1 text-sm">Category</label>
  <input
    type="text"
    value={categoryName}
    onChange={(e) => setCategoryName(e.target.value)}
    className="w-full border p-2 rounded"
    placeholder="Enter category name"
  />
</div>


      <div className="mb-4">
        <label className="block mb-1 text-sm">Question</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {choices.map((choice, i) => (
        <div className="flex gap-2 mb-2" key={i}>
          <input
            type="text"
            placeholder={`Choice ${i + 1}`}
            value={choice}
            onChange={(e) => {
              const newChoices = [...choices];
              newChoices[i] = e.target.value;
              setChoices(newChoices);
            }}
            className="w-3/4 border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Value"
            value={values[i]}
            onChange={(e) => {
              const newValues = [...values];
              newValues[i] = Number(e.target.value);
              setValues(newValues);
            }}
            className="w-1/4 border p-2 rounded"
          />
        </div>
      ))}

      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => setShowQuestionModal(false)}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            if (!categoryName || !questionText || choices.some(c => !c)) return;
            try {
              const res = await fetch("/api/questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
  category_name: categoryName,
  question_text: questionText,
  choices: choices.map((text, i) => ({
    text,
    value: values[i],
  })),
}),

              });

              const result = await res.json();
              console.log("Result:", result);

              setSelectedCategoryId(null);
              setQuestionText("");
              setChoices(["", "", "", ""]);
              setValues([0, 0, 0, 0]);
              setShowQuestionModal(false);
            } catch (err) {
              console.error("Failed to submit question:", err);
            }
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminExamTable;
