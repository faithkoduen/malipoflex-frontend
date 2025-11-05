"use client";

import React, { useState } from "react";

export interface Member {
  member_id?: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  password?: string;
  user_type: string;
  national_id?: string;
  kra_pin?: string;
  email?: string;
  next_of_kin_name?: string;
  next_of_kin_id?: string;
  date?: string;
  status?: string;
}

interface MembersModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  onAddMember: (member: Member) => void;
}

export default function MembersModal({
  showModal,
  setShowModal,
  onAddMember,
}: MembersModalProps) {
  const [newMember, setNewMember] = useState<Member>({
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    user_type: "MEMBER",
    national_id: "",
    kra_pin: "",
    email: "",
    next_of_kin_name: "",
    next_of_kin_id: "",
    date: new Date().toISOString().split("T")[0],
    status: "PENDING",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (
      !newMember.first_name ||
      !newMember.last_name ||
      !newMember.phone_number ||
      !newMember.password 
    ) {
      setError(
        "First name, last name, phone number, and password are required."
      );
      return;
    }

    onAddMember(newMember);
    setShowModal(false);
    setNewMember({
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
      user_type: "MEMBER",
      national_id: "",
      kra_pin: "",
      email: "",
      next_of_kin_name: "",
      next_of_kin_id: "",
      date: new Date().toISOString().split("T")[0],
      status: "PENDING",
    });
    setError(null);
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#7eb5c4a6] opacity-85 overflow-y-auto"
      onClick={() => setShowModal(false)}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-4 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-[#075D74] text-center mb-4">
          Add New Member
        </h3>

        <div className="space-y-3">
          <InputField
            label="First Name"
            value={newMember.first_name}
            onChange={(val) => setNewMember({ ...newMember, first_name: val })}
            required
          />
          <InputField
            label="Last Name"
            value={newMember.last_name}
            onChange={(val) => setNewMember({ ...newMember, last_name: val })}
            required
          />
          <InputField
            label="Phone Number"
            value={newMember.phone_number}
            onChange={(val) => setNewMember({ ...newMember, phone_number: val })}
            required
          />
          <InputField
            label="Password"
            type="password"
            value={newMember.password ?? ""}
            onChange={(val) => setNewMember({ ...newMember, password: val })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#075D74]"
              value={newMember.user_type}
              onChange={(e) =>
                setNewMember({ ...newMember, user_type: e.target.value })
              }
            >
              <option value="MEMBER">Member</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <InputField
            label="National ID"
            value={newMember.national_id ?? ""}
            onChange={(val) => setNewMember({ ...newMember, national_id: val })}
          />
          <InputField
            label="KRA PIN"
            value={newMember.kra_pin ?? ""}
            onChange={(val) => setNewMember({ ...newMember, kra_pin: val })}
          />
          <InputField
            label="Email"
            type="email"
            value={newMember.email ?? ""}
            onChange={(val) => setNewMember({ ...newMember, email: val })}
          />
          <InputField
            label="Next of Kin Name"
            value={newMember.next_of_kin_name ?? ""}
            onChange={(val) => setNewMember({ ...newMember, next_of_kin_name: val })}
          />
          <InputField
            label="Next of Kin ID"
            value={newMember.next_of_kin_id ?? ""}
            onChange={(val) => setNewMember({ ...newMember, next_of_kin_id: val })}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-3">{error}</p>
        )}

        <div className="flex gap-3 mt-5">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-[#075D74] text-white py-2 px-4 rounded-md hover:bg-[#054a5c] transition"
          >
            Add Member
          </button>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="flex-1 border border-[#075D74] text-[#075D74] py-2 px-4 rounded-md hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: InputFieldProps) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#075D74]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      required={required}
    />
  </div>
);