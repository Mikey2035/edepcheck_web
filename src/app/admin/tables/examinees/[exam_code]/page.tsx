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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Examinees for Exam {exam_code}</h1>
          <button
            onClick={handleBack}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Back
          </button>
        </div>

        {loading ? (
          <p>Loading results...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Exam Code</th>
                  <th className="border px-4 py-2">Examinee</th>
                  <th className="border px-4 py-2">Total Score</th>
                  <th className="border px-4 py-2">Severity</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{res.exam_code}</td>
                    <td className="border px-4 py-2">
                      <Link
                        href={`/admin/tables/examinees/${exam_code}/${encodeURIComponent(
                          res.fullname
                        )}`}
                      >
                        {res.fullname}
                      </Link>
                    </td>

                    <td className="border px-4 py-2">{res.total_score}</td>
                    <td className="border px-4 py-2">{res.severity}</td>
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
