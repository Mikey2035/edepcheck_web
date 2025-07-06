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
  LabelList,
} from "recharts";

// ✅ Types for severity data
type SeverityData = {
  groupField: string;
  severity: string;
  total: number;
};

type GroupedSeverityData = {
  group: string;
  [severity: string]: string | number;
};

// ✅ Severity categories
const ALL_SEVERITIES = [
  "Minimal depression or No Depression",
  "Mild depression",
  "Moderate depression",
  "Moderately Severe depression",
  "Severe depression",
];

// ✅ Custom Tooltip component
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    dataKey?: string;
    value?: number;
    color?: string;
  }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const total = payload.reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0
    );

    return (
      <div className="bg-white p-3 rounded-lg shadow text-sm">
        <p className="font-semibold text-[#1f2937] mb-2">{label}</p>
        {payload.map((entry, index) => {
          const count = Number(entry.value);
          const percentage = total ? ((count / total) * 100).toFixed(1) : "0.0";
          return (
            <div key={index} className="flex justify-between gap-4">
              <span style={{ color: entry.color }}>{entry.dataKey}</span>
              <span>
                {count} ({percentage}%)
              </span>
            </div>
          );
        })}
        <div className="mt-2 border-t pt-1 text-gray-500">
          Total: {total} people
        </div>
      </div>
    );
  }

  return null;
};

// ✅ Get color based on severity
function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case "minimal depression or no depression":
      return "#f2e7b1"; // pale Yellow
    case "mild depression":
      return "#fcd116"; // Yellow
    case "moderate depression":
      return "#A3D8F4"; // Light Blue
    case "moderately severe depression":
      return "#f2888d"; // Light Pink
    case "severe depression":
      return "#c8272d"; // Red
    default:
      return "#a3a3a3"; // Fallback gray
  }
}

function capitalize(str: string) {
  return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}


function convertToCSV(data: GroupedSeverityData[]): string {
  const headers = ["Group", ...ALL_SEVERITIES];
  const rows = data.map((row) =>
    [row.group, ...ALL_SEVERITIES.map((s) => row[s] ?? 0)].join(",")
  );
  return [headers.join(","), ...rows].join("\n");
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

  const handleExportCSV = () => {
    const csv = convertToCSV(chartData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `severity_stats_by_${groupBy}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    window.location.href = "/sign/login";
  };

  return (
    <div className="min-h-screen bg-[#A3D8F4] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

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


        <div className="flex justify-end mb-4">
          <button
            onClick={handleExportCSV}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow transition"
          >
            Export to CSV
          </button>
        </div>


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
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {ALL_SEVERITIES.map((severity) => (
                <Bar
                  key={severity}
                  dataKey={severity}
                  fill={getSeverityColor(severity)}
                  isAnimationActive
                >
                  <LabelList
                    dataKey={severity}
                    position="insideRight"
                    fill="#1f2937"
                    fontSize={12}
                    formatter={(value: any) => (value ? `${value}` : "")}
                  />
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
