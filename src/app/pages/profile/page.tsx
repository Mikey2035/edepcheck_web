"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

type User = {
  id: number;
  fullname: string;
  email: string;
  division: string;
  position: string;
  role: string;
  created_at: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    division: "",
    position: "",
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (!storedEmail) {
      router.push("/sign/login");
      return;
    }

    fetch(`/api/user?email=${storedEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({
          fullname: data.fullname,
          division: data.division,
          position: data.position,
        });
      })
      .catch(() => {
        router.push("/sign/login");
      });
  }, [router]);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/sign/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  if (!user) return;

  try {
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        fullname: formData.fullname,
        division: formData.division,
        position: formData.position,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "Failed to update profile.");
      return;
    }

    // Update local state to reflect changes
    setUser((prev) => prev ? { ...prev, ...formData } : null);
    setShowModal(false);
    alert("Profile updated successfully.");
  } catch (error) {
    console.error("Update failed:", error);
    alert("An error occurred while updating the profile.");
  }
};


  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 relative">
      <button
        onClick={() => router.back()}
        className="text-blue-600 flex items-center gap-2 mb-6"
      >
        <IoArrowBack size={20} />
        Back
      </button>

      <h1 className="text-3xl font-bold text-blue-800 mb-6">Your Profile</h1>

      <div className="relative bg-white shadow rounded-lg p-6 space-y-4">
        {/* Buttons Top-Right */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </div>

        <div><p className="text-sm text-gray-600">Full Name:</p><p>{user.fullname}</p></div>
        <div><p className="text-sm text-gray-600">Email:</p><p>{user.email}</p></div>
        <div><p className="text-sm text-gray-600">Division:</p><p>{user.division}</p></div>
        <div><p className="text-sm text-gray-600">Position:</p><p>{user.position}</p></div>
        <div><p className="text-sm text-gray-600">Role:</p><p>{user.role}</p></div>
        <div><p className="text-sm text-gray-600">Account Created:</p><p>{new Date(user.created_at).toLocaleString()}</p></div>
      </div>

      {/* ✨ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg relative">
            <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>

            <label className="block">
              <span className="text-sm text-gray-600">Full Name</span>
              <input
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-600">Division</span>
              <input
                name="division"
                value={formData.division}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-600">Position</span>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
