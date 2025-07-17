"use client";

import { useState } from "react";
import { matchClosestProfile } from "@/app/hooks/useMatchUserData";
import userData from "@/app/data/useData.json";
import Button from "./ui/Button";
import { supabase } from "@/app/lib/supabase";
import { useUser } from "@/app/context/UserContext";

type Props = {
  onMatch?: (result: any) => void;
};

export default function Form({ onMatch }: Props) {
  const { user, setUser } = useUser();
  const [form, setForm] = useState({ height: "", weight: "", gender: "male" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const matched = matchClosestProfile(
      {
        height: Number(form.height),
        weight: Number(form.weight),
        gender: form.gender,
      },
      userData
    );

    if (!user) {
      alert("You must be logged in.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .update({ matched_result: matched })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Failed to save matched data", error);
      setLoading(false);
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(data));
    setUser(data);
    onMatch?.(matched);

    setLoading(false); 
  };

  return (
    <section className="w-full mt-20 flex flex-col items-center gap-10">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-blue-900">Let’s Get Started</h2>
        <p className="text-gray-600 text-lg">
          Please enter your basic info to help us match your profile to the most
          accurate biometric and gait analysis results.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg space-y-6 w-full max-w-xl"
      >
        <h1 className="text-2xl font-semibold text-gray-800">Your Info</h1>
        <input
          type="number"
          placeholder="Height (cm)"
          className="input input-bordered w-full p-2 text-lg"
          value={form.height}
          onChange={(e) => setForm({ ...form, height: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          className="input input-bordered w-full p-2 text-lg"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
          required
        />
        <select
          className="select select-bordered w-full p-2 text-lg"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <Button
          className="w-full"
          type="submit"
          isLoading={loading}
          text={"Analyze"}
        />
      </form>
    </section>
  );
}
