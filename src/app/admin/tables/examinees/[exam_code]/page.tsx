"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface ExamineeResult {
  exam_code: string;
  fullname: string;
  total_score: number;
  severity: string;
}

const ExamineeListPage = () => {
  const params = useParams();
  const exam_code = Array.isArray(params?.exam_code)
    ? params.exam_code[0]
    : params?.exam_code;
  const router = useRouter();
  const [results, setResults] = useState<ExamineeResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/examinees?exam_code=${exam_code}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching examinees:", err);
      } finally {
        setLoading(false);
      }
    };

    if (exam_code) {
      fetchResults();
    }
  }, [exam_code]);

  const handleBack = () => {
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#A3D8F4] py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#c8272d]">
            Examinees for Exam <span className="text-black">{exam_code}</span>
          </h1>
          <button
            onClick={handleBack}
            className="bg-[#fcd116] hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full shadow"
          >
            ← Back
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-700">Loading results...</p>
        ) : results.length === 0 ? (
          <p className="text-center text-red-600 font-semibold">
            No examinees found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-[#fcd116]/40 text-gray-800">
                <tr>
                  <th className="px-4 py-3 border text-left">Exam Code</th>
                  <th className="px-4 py-3 border text-left">Examinee</th>
                  <th className="px-4 py-3 border text-center">Total Score</th>
                  <th className="px-4 py-3 border text-center">Severity</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 border">{res.exam_code}</td>
                    <td className="px-4 py-2 border text-blue-800 font-medium">
                      <Link
                        href={`/admin/tables/examinees/${exam_code}/${encodeURIComponent(
                          res.fullname
                        )}`}
                        className="hover:underline"
                      >
                        {res.fullname}
                      </Link>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {res.total_score}
                    </td>
                    <td
                      className={`px-4 py-2 border text-center font-semibold ${
                        res.severity.toLowerCase().includes("severe")
                          ? "text-red-600"
                          : res.severity.toLowerCase().includes("moderate")
                          ? "text-yellow-600"
                          : "text-green-700"
                      }`}
                    >
                      {res.severity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamineeListPage;
