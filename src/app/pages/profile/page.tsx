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
  birthday: string;
  age: number;
  sex_and_gender: string;
  civil_status: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    division: "",
    position: "",
    sex_and_gender: "",
    civil_status: "",
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (!storedEmail) {
      router.push("/sign/login");
      return;
    }

    fetch(`/api/user?email=${storedEmail}`)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        setUser(data);
        setFormData({
          fullname: data.fullname,
          division: data.division,
          position: data.position,
          sex_and_gender: data.sex_and_gender,
          civil_status: data.civil_status,
        });
      })
      .catch(() => router.push("/sign/login"));
  }, [router]);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/sign/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, ...formData }),
      });
      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Failed to update profile.");
        return;
      }

      setUser((prev) => (prev ? { ...prev, ...formData } : null));
      setShowModal(false);
      alert("Profile updated successfully.");
    } catch (error) {
      alert("An error occurred while updating the profile.");
    }
  };

  if (!user) return <div className="p-6 text-center text-gray-600">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-[#A3D8F4] flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl p-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <button onClick={() => router.back()} className="text-[#c8272d] flex items-center text-sm hover:underline">
            <IoArrowBack className="mr-1" size={18} />
            Back
          </button>
          <h1 className="text-2xl font-bold text-[#c8272d] text-center flex-grow">My Profile</h1>
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {[
            ["Full Name", user.fullname],
            ["Email", user.email],
            ["Division", user.division],
            ["Position", user.position],
            ["Birthday", new Date(user.birthday).toLocaleDateString()],
            ["Age", user.age.toString()],
            ["Sex and Gender", user.sex_and_gender],
            ["Civil Status", user.civil_status],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#fcd116] hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-[#c8272d] hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg space-y-5">
            <h2 className="text-xl font-bold text-[#c8272d] text-center mb-2">Edit Profile</h2>

            {[
              ["fullname", "Full Name"],
              ["division", "Division"],
              ["position", "Position"],
            ].map(([name, label]) => (
              <div key={name}>
                <label className="block text-sm text-gray-700">{label}</label>
                <input
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#fcd116]"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm text-gray-700">Sex and Gender</label>
              <select
                name="sex_and_gender"
                value={formData.sex_and_gender}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#fcd116]"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Transgender</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700">Civil Status</label>
              <select
                name="civil_status"
                value={formData.civil_status}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#fcd116]"
              >
                <option value="">Select</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Widowed</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-[#fcd116] hover:bg-yellow-400 font-semibold"
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
