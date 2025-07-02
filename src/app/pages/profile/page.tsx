"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function ProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const storedFullName = sessionStorage.getItem("fullName");

    if (!storedFullName) {
      router.push("/sign");
    } else {
      setFullName(storedFullName);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/sign/login");
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <button
        onClick={() => router.back()}
        className="text-blue-600 flex items-center gap-2 mb-6"
      >
        <IoArrowBack size={20} />
        Back
      </button>

      <h1 className="text-3xl font-bold text-blue-800 mb-6">Your Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <p className="text-gray-600 text-sm">Full Name:</p>
          <p className="text-lg font-medium text-gray-900">{fullName}</p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
