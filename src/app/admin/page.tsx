"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/configs/firebase";

interface Result {
  id: string;
  username: string;
  total_score: number;
  severity: string;
  created_at: Timestamp;
}

interface User {
  id: string;
  email: string;
  role: string;
  fullname: string;
}

const AdminPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/sign");
  };

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const storedRole = sessionStorage.getItem("role");

    if (!storedUsername || storedRole !== "admin") {
      router.push("/");
    } else {
      setUsername(storedUsername);
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resQuery = query(
          collection(db, "phq9_results"),
          orderBy("created_at", "desc")
        );
        const resSnap = await getDocs(resQuery);
        const allResults = resSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            username: data.username,
            total_score: data.total_score,
            severity: data.severity,
            created_at: data.created_at,
          } as Result;
        });

        setResults(allResults);
        setFilteredResults(allResults);

        const userSnap = await getDocs(collection(db, "users"));
        const allUsers = userSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.email,
            role: data.role,
            fullname: data.fullname,
          } as User;
        });

        setUsers(allUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = results;
    if (searchTerm) {
      filtered = filtered.filter((res) =>
        res.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (severityFilter !== "All") {
      filtered = filtered.filter((res) => res.severity === severityFilter);
    }

    setFilteredResults(filtered);
  }, [searchTerm, severityFilter, results]);

  const exportToCSV = () => {
    const header = ["Username", "Total Score", "Severity", "Date"];
    const rows = filteredResults.map((res) => [
      res.username,
      res.total_score,
      res.severity,
      res.created_at.toDate().toLocaleString(),
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "phq9_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Header with Log Out */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>
            <p className="text-gray-700">Welcome, <strong>{username}</strong>!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </div>

        {/* Filters and Export */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by username"
            className="p-2 border rounded w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded w-full md:w-1/4"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="All">All Severities</option>
            <option value="Minimal depression">Minimal depression</option>
            <option value="Mild depression">Mild depression</option>
            <option value="Moderate depression">Moderate depression</option>
            <option value="Moderately severe depression">Moderately severe depression</option>
            <option value="Severe depression">Severe depression</option>
          </select>
          <button
            onClick={exportToCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Export CSV
          </button>
        </div>

        {/* PHQ-9 Results Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="overflow-x-auto mb-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                PHQ-9 Submissions
              </h2>
              <table className="w-full table-auto border border-gray-300">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border px-4 py-2">Username</th>
                    <th className="border px-4 py-2">Score</th>
                    <th className="border px-4 py-2">Severity</th>
                    <th className="border px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((result) => (
                    <tr key={result.id}>
                      <td className="border px-4 py-2">{result.username}</td>
                      <td className="border px-4 py-2">{result.total_score}</td>
                      <td className="border px-4 py-2">{result.severity}</td>
                      <td className="border px-4 py-2">
                        {result.created_at.toDate().toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Registered Users Table */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Registered Users
              </h2>
              <table className="w-full table-auto border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Full Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="border px-4 py-2">{user.fullname}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
