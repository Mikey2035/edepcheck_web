"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface ResponseDetail {
  question: string;
  choice: string;
  value: number;
  total_score: number;
  severity: string;
}

export default function ExamineeDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const exam_code = Array.isArray(params?.exam_code) ? params.exam_code[0] : params?.exam_code ?? "";
  const examinee = Array.isArray(params?.examinee) ? params.examinee[0] : params?.examinee ?? "";

  const [details, setDetails] = useState<ResponseDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `/api/examinees?exam_code=${exam_code}&fullname=${encodeURIComponent(examinee)}`
        );
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (exam_code && examinee) {
      fetchDetails();
    }
  }, [exam_code, examinee]);

  const handleBack = () => {
    router.back();
  };

  const totalScore = details[0]?.total_score ?? 0;
  const severity = details[0]?.severity ?? "";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Examinee: {examinee} <br /> Exam Code: {exam_code}
          </h1>
          <button onClick={handleBack} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Back
          </button>
        </div>

        {loading ? (
          <p>Loading details...</p>
        ) : details.length === 0 ? (
          <p>No responses found for this examinee.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Question</th>
                  <th className="border px-4 py-2">Choice</th>
                  <th className="border px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{detail.question}</td>
                    <td className="border px-4 py-2">{detail.choice}</td>
                    <td className="border px-4 py-2">{detail.value}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td className="border px-4 py-2" colSpan={2}>
                    Total Score
                  </td>
                  <td className="border px-4 py-2">{totalScore}</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="border px-4 py-2" colSpan={2}>
                    Severity
                  </td>
                  <td className="border px-4 py-2">{severity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
