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

  const exam_code = Array.isArray(params?.exam_code)
    ? params.exam_code[0]
    : params?.exam_code ?? "";
  const examineeParam = Array.isArray(params?.examinee)
    ? params.examinee[0]
    : params?.examinee ?? "";
  const examinee = decodeURIComponent(examineeParam);

  const [details, setDetails] = useState<ResponseDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `/api/examinees?exam_code=${exam_code}&fullname=${encodeURIComponent(
            examinee
          )}`
        );
        if (!res.ok) throw new Error("Failed to fetch examinee details");
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        alert(
          "Error: Unable to fetch examinee details. Please try again later."
        );
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
    <div className="min-h-screen bg-[#A3D8F4] py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#c8272d]">
              Examinee: <span className="text-black">{examinee}</span>
            </h1>
            <p className="text-gray-700 text-lg mt-1">
              Exam Code: <span className="font-semibold">{exam_code}</span>
            </p>
          </div>
          <button
            onClick={handleBack}
            className="bg-[#fcd116] hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full shadow"
          >
            ← Back
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-700">Loading details...</p>
        ) : details.length === 0 ? (
          <p className="text-center text-red-600 font-semibold">
            No responses found for this examinee.
          </p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden text-sm">
              <thead className="bg-[#fcd116]/40 text-gray-800">
                <tr>
                  <th className="px-4 py-3 border text-left">Question</th>
                  <th className="px-4 py-3 border text-left">Choice</th>
                  <th className="px-4 py-3 border text-center">Value</th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 border">{detail.question}</td>
                    <td className="px-4 py-2 border text-blue-800">
                      {detail.choice}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {detail.value}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#fcd116]/30 font-semibold text-gray-900">
                  <td className="px-4 py-2 border" colSpan={2}>
                    Total Score
                  </td>
                  <td className="px-4 py-2 border text-center">{totalScore}</td>
                </tr>
                <tr className="bg-[#fcd116]/30 font-semibold text-gray-900">
                  <td className="px-4 py-2 border" colSpan={2}>
                    Severity
                  </td>
                  <td className="px-4 py-2 border text-center text-red-600">
                    {severity}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
