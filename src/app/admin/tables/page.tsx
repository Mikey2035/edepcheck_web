"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

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
  const [editExam, setEditExam] = useState<Exam | null>(null);

  // Questions
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [values, setValues] = useState([0, 0, 0, 0]);
  const [questionsData, setQuestionsData] = useState<any[]>([]);
  const [editQuestionId, setEditQuestionId] = useState<number | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);


  useEffect(() => {
    fetchExams();
    fetchQuestions();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/questions?categories=1");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await fetch("/api/exams");
      const data = await response.json();
      if (!Array.isArray(data)) return setExams([]);
      setExams(data);
    } catch (err) {
      console.error("Failed to fetch exams:", err);
      setExams([]);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/questions");
      const data = await response.json();

      const groupedByCategory: any = {};

      data.forEach((row: any) => {
        const {
          category_name,
          question_id,
          question_text,
          choice_text,
          choice_value,
        } = row;

        if (!groupedByCategory[category_name]) {
          groupedByCategory[category_name] = {};
        }

        if (!groupedByCategory[category_name][question_id]) {
          groupedByCategory[category_name][question_id] = {
            question_id,
            question_text,
            choices: [],
          };
        }

        groupedByCategory[category_name][question_id].choices.push({
          text: choice_text,
          value: choice_value,
        });
      });

      setQuestionsData(groupedByCategory);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    }
  };
  

  const handleDeleteQuestion = async (questionId: number) => {
    try {
      const res = await fetch(`/api/questions?question_id=${questionId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete question");
      fetchQuestions();
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  const handleQuestionSubmit = async () => {
    if (!categoryName || !questionText || choices.some((c) => !c)) return;

    const url = editQuestionId
      ? `/api/questions?question_id=${editQuestionId}`
      : "/api/questions";
    const method = editQuestionId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category_name: categoryName,
        question_text: questionText,
        choices: choices.map((text, i) => ({
          text,
          value: parseInt(values[i] as any, 10) || 0,
        })),
      }),
    });

    setCategoryName("");
    setQuestionText("");
    setChoices(["", "", "", ""]);
    setValues([0, 0, 0, 0]);
    setEditQuestionId(null);
    setShowQuestionModal(false);
    fetchQuestions();
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_name: newCategoryName,
          only_category: true, // Optional flag to signal it's category-only
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add category");

      alert("Category added!");
      setShowCategoryModal(false);
      setNewCategoryName("");

      // 🔄 Optionally reload categories here (if in dropdown or list)
    } catch (err) {
      console.error(err);
      alert("Error adding category.");
    }
  };
  
  

  const handleAddOrEditExam = async () => {
    if (!title || !date) return;
    const formattedDate = new Date(date);
    const exam_code = editExam
      ? editExam.exam_code
      : formattedDate.toISOString().slice(0, 10).replace(/-/g, "");
    const examData = {
      exam_code,
      title,
      severity: "Pending",
      total_examinees: 0,
      exam_date: formattedDate.toISOString().slice(0, 10),
    };
    try {
      const res = await fetch("/api/exams", {
        method: editExam ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(examData),
      });
      if (!res.ok) throw new Error("Failed to save exam");
      setTitle("");
      setDate("");
      setShowModal(false);
      setEditExam(null);
      fetchExams();
    } catch (err) {
      console.error("Error saving exam:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };
  
  


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-md p-6">
        {/* Exams Table */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Examinations</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editExam ? "Edit Exam" : "Add Exam"}
          </button>
          
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Exam Code</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Severity</th>
                <th className="border px-4 py-2">Examinees</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.exam_code}>
                  <td className="border px-4 py-2">{exam.exam_code}</td>
                  <td className="border px-4 py-2">
                    <Link href={`/admin/tables/examinees/${exam.exam_code}`}>
                      {exam.title}
                    </Link>
                  </td>
                  <td className="border px-4 py-2">{exam.severity}</td>
                  <td className="border px-4 py-2">{exam.total_examinees}</td>
                  <td className="border px-4 py-2">
                    {formatDate(exam.exam_date)}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => {
                        setTitle(exam.title);
                        setDate(exam.exam_date);
                        setEditExam(exam);
                        setShowModal(true);
                      }}
                    >
                      <FaEdit className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            `/api/exams?exam_code=${exam.exam_code}`,
                            {
                              method: "DELETE",
                            }
                          );
                          if (!res.ok) throw new Error("Failed to delete exam");
                          fetchExams();
                        } catch (err) {
                          console.error("Error deleting exam:", err);
                        }
                      }}
                    >
                      <FaTrash className="w-5 h-5 text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Questions Table */}
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
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(questionsData).map(
                  ([categoryName, questions]: any) => {
                    const questionEntries = Object.values(questions);
                    const totalChoices = questionEntries.reduce(
                      (sum: number, q: any) => sum + q.choices.length,
                      0
                    );

                    let renderedCategory = false;

                    return questionEntries.map((q: any, qIdx: number) =>
                      q.choices.map((choice: any, cIdx: number) => (
                        <tr key={`${q.question_id}-${cIdx}`}>
                          {/* Render category once, with total row span of all its choices */}
                          {!renderedCategory && (
                            <td
                              rowSpan={totalChoices}
                              className="border px-4 py-2 font-semibold align-top"
                            >
                              {categoryName}
                            </td>
                          )}
                          {(renderedCategory = true)}

                          {/* Render question once with its own row span */}
                          {cIdx === 0 && (
                            <td
                              rowSpan={q.choices.length}
                              className="border px-4 py-2 align-top"
                            >
                              {q.question_text}
                            </td>
                          )}
                          <td className="border px-4 py-2">{choice.text}</td>
                          <td className="border px-4 py-2">{choice.value}</td>

                          {/* Render actions only once per question */}
                          {cIdx === 0 && (
                            <td
                              rowSpan={q.choices.length}
                              className="border px-4 py-2 align-top"
                            >
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    setShowQuestionModal(true);
                                    setEditQuestionId(q.question_id);
                                    setCategoryName(categoryName);
                                    setQuestionText(q.question_text);
                                    setChoices(
                                      q.choices.map((c: any) => c.text)
                                    );
                                    setValues(
                                      q.choices.map((c: any) => c.value)
                                    );
                                  }}
                                >
                                  <FaEdit className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteQuestion(q.question_id)
                                  }
                                >
                                  <FaTrash className="w-5 h-5 text-red-500 hover:text-red-700" />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Exam Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editExam ? "Edit Examination" : "Add Examination"}
            </h3>
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
                onClick={() => {
                  setShowModal(false);
                  setEditExam(null);
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEditExam}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editExam ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              {editQuestionId ? "Edit Question" : "Add Question"}
            </h3>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowCategoryModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Category
              </button>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm">Category</label>
              <select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
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
                onClick={() => {
                  setShowQuestionModal(false);
                  setEditQuestionId(null);
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleQuestionSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editQuestionId ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setNewCategoryName("");
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
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
