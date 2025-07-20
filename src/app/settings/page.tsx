"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { supabase } from "@/app/lib/supabase";
import { EyeIcon, EyeOffIcon, Edit2Icon } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user, setUser } = useUser();

  const [form, setForm] = useState({
    id: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id,
        email: user.email || "",
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setStatus("");

    const updates: any = {};
    if (form.email !== user?.email) updates.email = form.email;

    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", form.id);

    if (error) {
      console.error("Failed to update settings:", error);
      toast.error("Failed to save changes.");
    } else {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setIsEditing(false);
      toast.success("Settings updated successfully.");
    }
  };

  const handleSavePassword = async () => {
    setStatus("");

    if (form.password !== user?.password) {
      setStatus("Old password is wrong.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setStatus("New passwords do not match.");
      return;
    }

    if (!form.password || !form.newPassword || !form.confirmPassword) {
      setStatus("All password fields are required.");
      return;
    }

    const updates = { password: form.newPassword };

    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", form.id);

    if (error) {
      console.error("Failed to update password:", error);
      toast.error("Failed to update password.");
    } else {
      setForm((prev) => ({
        ...prev,
        password: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setIsEditingPassword(false);
      toast.success("Password updated successfully.");
    }
  };

  if (!user) return null;

  return (
    <section>
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-semibold text-blue-900">
            Account Settings
          </h1>
          <div className="flex gap-3">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setForm((prev) => ({
                      ...prev,
                      email: user.email,
                    }));
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                <Edit2Icon size={16} />
              </button>
            )}
          </div>
        </div>
        <h2 className="font-bold text-3xl text-blue-950">
          {user.firstName} {user.lastName}
        </h2>

        {status && (
          <p className="text-sm text-center text-red-600 font-medium">
            {status}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField("Email", "email", form.email, "email")}

          {/* Password section */}
          <div className="md:col-span-2">
            <label className="block font-semibold text-lg mb-1">Password</label>

            {!isEditingPassword ? (
              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  {showPassword ? user.password : "••••••••"}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => setIsEditingPassword(true)}
                    className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    Edit Password
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 mt-3">
                {renderPasswordField("Old Password", "password", form.password)}
                {renderPasswordField(
                  "New Password",
                  "newPassword",
                  form.newPassword
                )}
                {renderPasswordField(
                  "Confirm Password",
                  "confirmPassword",
                  form.confirmPassword
                )}

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsEditingPassword(false);
                      setForm((prev) => ({
                        ...prev,
                        password: "",
                        newPassword: "",
                        confirmPassword: "",
                      }));
                    }}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePassword}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
                  >
                    Save Password
                  </button>
                </div>
              </div>
            )}
          </div>
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
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className="input bg-[#f4f5f6] p-2 rounded-lg w-full"
          />
        ) : (
          <p className="text-gray-900">{value || "—"}</p>
        )}
      </div>
    );
  }

  function renderPasswordField(label: string, name: string, value: string) {
    return (
      <div className="relative">
        <label className="block font-medium text-sm mb-1">{label}</label>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          autoComplete="new-password"
          onChange={handleChange}
          className="input bg-[#f4f5f6] p-2 rounded-lg w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-gray-500"
        >
          {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </button>
      </div>
    );
  }
}
