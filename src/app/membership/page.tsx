"use client";

import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { supabase } from "../lib/supabase";
import { Edit2Icon } from "lucide-react";
import toast from "react-hot-toast";

export default function MembershipPage() {
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
      toast.success("Changes Updated successfully");
      setIsEditing(false);
    } else {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user");
    }
  };

  if (!form) return null;

  return (
    <section>
      <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold text-blue-900">Membership</h1>
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
        <div>
          <label className="font-semibold text-lg">
            Membership ID : {user?.membershipId || "#uhvs78dvsk"}
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField(
            "Payment Method",
            "cardType",
            form.cardType || "—",
            "select",
            ["Visa", "Mastercard", "Dues"]
          )}

          {renderField(
            "Years of Membership",
            "yearsMembership",
            form.yearsMembership || "—",
            "number"
          )}
        </div>
      </div>
    </section>
  );
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
              className="select p-[10px] bg-[#f4f5f6] rounded-lg w-full"
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
