"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { supabase } from "@/app/lib/supabase";
import Button from "../ui/Button";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData: any) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", formData.email)
      .eq("password", formData.password);

    if (error) {
      console.error("Login error:", error);
      setError("email", { message: "Server error. Please try again." });
      return;
    }

    if (!data || data.length === 0) {
      setError("email", { message: "Invalid email or password" });
      setError("password", { message: "Invalid email or password" });
      return;
    }

    const user = data[0];
    localStorage.setItem("currentUser", JSON.stringify(user));
    setUser(user);
    router.push("/profile");
  };

  return (
    <section className="w-full mt-20 flex flex-col items-center gap-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-900">Login</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-2xl shadow-lg space-y-6 w-full max-w-xl"
      >
        <div>
          <label htmlFor="email" className="font-semibold text-gray-700 block">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="input mt-2 bg-[#f4f5f6] p-2 rounded-lg w-full"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="font-semibold text-gray-700 block"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="input mt-2 bg-[#f4f5f6] p-2 rounded-lg w-full"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <Button
          className="w-full"
          type="submit"
          isLoading={isSubmitting}
          text={"Login"}
        />
      </form>
    </section>
  );
}
