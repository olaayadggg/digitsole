"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { supabase } from "@/app/lib/supabase";
import { Edit2Icon } from "lucide-react";

export default function PatientProfilePage() {
  const { user, setUser } = useUser();
  const [form, setForm] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form) return;
    const { error } = await supabase
      .from("users")
      .update(form)
      .eq("id", form.id);
    if (!error) {
      setUser(form);
      localStorage.setItem("currentUser", JSON.stringify(form));
      setIsEditing(false);
    } else {
      console.error("Failed to update user:", error);
    }
  };

  if (!form) return null;

  return (
    <div className="p-6">
      <div className="bg-white p-8 rounded-xl shadow-md space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-base text-gray-800">
              {form.firstName} {form.lastName}
              <span className="text-gray-500 text-sm ml-2 mt-1">
                {form.birthDay}
              </span>
            </h1>
          </div>
          <div>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                <Edit2Icon size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField("First Name", "firstName", form.firstName)}
          {renderField("Last Name", "lastName", form.lastName)}
          {renderField("Birth Date", "birthDay", form.birthDay, "date")}
          {renderField("Nationality", "nationality", form.nationality || "—")}
          {renderField(
            "Medical Specialty",
            "medicalSpecialty",
            form.medicalSpecialty || "—"
          )}
          {renderField(
            "Years of Membership",
            "yearsMembership",
            form.yearsMembership || "—"
          )}
          {renderField("Card Type", "cardType", form.cardType || "—")}
          {renderField("Email", "email", form.email || "—")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg">
          {renderInfo("Gender", "gender", form.gender)}
          {renderInfo("Height", "height", form.height || "—")}
          {renderInfo("Weight", "weight", form.weight || "—")}
          {renderInfo("Shoe Size", "shoeSize", form.shoeSize || "—")}
        </div>
      </div>
    </div>
  );

  function renderInfo(label: string, name: string, value: string | number) {
    return (
      <div className="text-center shadow p-4 rounded-lg bg-white">
        <p className="text-gray-900 font-bold text-xl">{label}</p>
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            className="input text-center w-full mt-1"
          />
        ) : (
          <p className="text-lg font-base text-gray-500">{value}</p>
        )}
      </div>
    );
  }

  function renderField(
    label: string,
    name: string,
    value: string,
    type: string = "text",
    options?: string[]
  ) {
    return (
      <div>
        <label className="block font-semibold text-lg mb-1">{label}</label>
        {isEditing ? (
          type === "select" && options ? (
            <select
              name={name}
              value={value}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              className="input bg-[#f4f5f6] p-2 rounded-lg w-full"
            />
          )
        ) : (
          <p className="text-gray-900">
            {value || <span className="text-gray-400">—</span>}
          </p>
        )}
      </div>
    );
  }
}
