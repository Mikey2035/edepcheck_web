"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/configs/firebase";
import { Timestamp } from "firebase/firestore";

interface Result {
  id: string;
  total_score: number;
  severity: string;
  created_at: Timestamp;
}

export default function HistoryPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const username = sessionStorage.getItem("username") || "";

      if (!username) return;

      const q = query(
        collection(db, "phq9_results"),
        where("username", "==", username),
        orderBy("created_at", "desc")
      );

      const snapshot = await getDocs(q);
      const fetchedResults = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          total_score: data.total_score,
          severity: data.severity,
          created_at: data.created_at,
        } as Result;
      });

      setResults(fetchedResults);
      setLoading(false);
    };

    fetchResults();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Your Past PHQ-9 Assessments</h1>

      {loading ? (
        <p>Loading results...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-600">You haven’t taken any assessments yet.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((result) => (
            <li key={result.id} className="p-4 bg-gray-100 rounded shadow-sm">
              <p><strong>Date:</strong> {result.created_at.toDate().toLocaleString()}</p>
              <p><strong>Total Score:</strong> {result.total_score}</p>
              <p><strong>Severity:</strong> {result.severity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
