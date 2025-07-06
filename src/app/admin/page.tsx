"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Constants
const ALL_SEVERITIES = [
  "Minimal depression or No Depression",
  "Mild depression",
  "Moderate depression",
  "Moderately Severe depression",
  "Severe depression",
];

type SeverityData = {
  groupField: string;
  severity: string;
  total: number;
};

type GroupedSeverityData = {
  group: string;
  [severity: string]: string | number;
};

function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case "minimal depression or no depression":
      return "#3b82f6"; // blue
    case "mild depression":
      return "#67e8f9"; // light blue
    case "moderate depression":
      return "#f472b6"; // pink
    case "moderately severe depression":
      return "#f9a8d4"; // light pink
    case "severe depression":
      return "#dc2626"; // red
    default:
      console.warn("Unknown severity:", severity);
      return "#a3a3a3"; // gray fallback
  }
}


function capitalize(str: string) {
  return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminDashboard() {
  const [chartData, setChartData] = useState<GroupedSeverityData[]>([]);
  const [groupBy, setGroupBy] = useState<string>("division");
  

  useEffect(() => {
    fetchStats();
  }, [groupBy]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`/api/admin/stats?groupBy=${groupBy}`);
      const rawData: SeverityData[] = await res.json();
      formatChartData(rawData);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  const formatChartData = (rawData: SeverityData[]) => {
    const grouped: Record<string, Record<string, number>> = {};

    rawData.forEach(({ groupField, severity, total }) => {
      if (!grouped[groupField]) grouped[groupField] = {};
      grouped[groupField][severity] =
        (grouped[groupField][severity] || 0) + total;
    });

    const formatted = Object.entries(grouped).map(([group, severities]) => {
      const entry: GroupedSeverityData = { group };
      ALL_SEVERITIES.forEach((sev) => {
        entry[sev] = severities[sev] || 0;
      });
      return entry;
    });

    setChartData(formatted);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    window.location.href = "/sign/login";
  };
  
  

  return (
    <div className="max-w-7xl mx-auto p-6 bg-indigo-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => (window.location.href = "/admin/tables")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Manage Table
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Group By Dropdown */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Group By</h2>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className="border rounded p-2"
        >
          <option value="division">Division</option>
          <option value="position">Position</option>
          <option value="age">Age</option>
          <option value="sex_and_gender">Sex and Gender</option>
        </select>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Severity by {capitalize(groupBy)}
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              dataKey="group"
              type="category"
              tick={{ fill: "#7f1d1d", fontWeight: 600 }}
            />
            <Tooltip />
            <Legend />
            {ALL_SEVERITIES.map((severity) => (
              <Bar
                key={severity}
                dataKey={severity}
                fill={getSeverityColor(severity)}
                isAnimationActive
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
