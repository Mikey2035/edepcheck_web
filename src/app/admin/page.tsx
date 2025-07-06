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
      return "#3b82f6";
    case "mild depression":
      return "#67e8f9";
    case "moderate depression":
      return "#f472b6";
    case "moderately severe depression":
      return "#f9a8d4";
    case "severe depression":
      return "#dc2626";
    default:
      return "#a3a3a3";
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
    <div className="min-h-screen bg-[#A3D8F4] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#c8272d] mb-4 sm:mb-0">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => (window.location.href = "/admin/tables")}
              className="bg-[#fcd116] hover:bg-yellow-400 text-black font-medium px-5 py-2 rounded-lg shadow transition"
            >
              Manage Table
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#c8272d] hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg shadow transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#1f2937] mb-3">
            Filter by Category
          </h2>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[#fcd116]"
          >
            <option value="division">Division</option>
            <option value="position">Position</option>
            <option value="age">Age</option>
            <option value="sex_and_gender">Sex and Gender</option>
            <option value="civil_status">Civil Status</option>
          </select>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#1e40af] mb-6">
            Severity Levels by {capitalize(groupBy)}
          </h2>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 20, right: 40, left: 100, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="group"
                tick={{ fill: "#1f2937", fontWeight: 600 }}
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
    </div>
  );
}
