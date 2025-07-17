"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { supabase } from "@/app/lib/supabase";
import Button from "../ui/Button";
import VisaIcon from "@/app/public/icons/VisaIcon";
import MasterCardIcon from "@/app/public/icons/MasterCardIcon";
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  birthDay: yup.string().required("Birthday is required"),
  gender: yup.string().required("Gender is required"),
  nationality: yup.string(),
  medicalSpecialty: yup.string(),
  yearsMembership: yup.string(),
  cardType: yup.string(),
  height: yup.number(),
  weight: yup.number(),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (form: any) => {
    const { data, error } = await supabase
      .from("users")
      .insert([form])
      .select();

    if (error) {
      console.error("Registration failed:", error);
      return;
    }

    const newUser = data?.[0];
    if (newUser) {
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setUser(newUser);
      router.push("/profile");
    }
  };

  return (
    <section className="w-full mt-20 flex flex-col items-center gap-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-900">Register</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-2xl shadow-lg space-y-6 w-full max-w-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>First Name *</label>
            <input
              {...register("firstName")}
              className="input bg-[#f4f5f6] mt-2 p-2 rounded-lg w-full"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label>Last Name *</label>
            <input
              {...register("lastName")}
              className="input bg-[#f4f5f6] mt-2 p-2 rounded-lg w-full"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Birthday *</label>
            <input
              type="date"
              {...register("birthDay")}
              className="input bg-[#f4f5f6] mt-2 p-2 rounded-lg w-full"
            />
            {errors.birthDay && (
              <p className="text-red-500 text-sm">{errors.birthDay.message}</p>
            )}
          </div>
          <div>
            <label>Gender *</label>
            <select
              {...register("gender")}
              className="select bg-[#f4f5f6] mt-2 p-3 rounded-lg w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Nationality</label>
            <input
              {...register("nationality")}
              className="input bg-[#f4f5f6] mt-2 p-2 rounded-lg w-full"
            />
            {errors.nationality && (
              <p className="text-red-500 text-sm">
                {errors.nationality.message}
              </p>
            )}
          </div>
          <div>
            <label>Medical Specialty</label>
            <input
              {...register("medicalSpecialty")}
              className="input bg-[#f4f5f6] mt-2 p-2 rounded-lg w-full"
            />
            {errors.medicalSpecialty && (
              <p className="text-red-500 text-sm">
                {errors.medicalSpecialty.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label>Years of Membership</label>
          <input
            {...register("yearsMembership")}
            className="input bg-[#f4f5f6] mt-2 p-2 rounded-lg w-full"
          />
          {errors.yearsMembership && (
            <p className="text-red-500 text-sm">
              {errors.yearsMembership.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Height (cm)</label>
            <input
              type="number"
              {...register("height")}
              className="input bg-[#f4f5f6] mt-2 p-2 rounded-lg w-full"
            />
            {errors.height && (
              <p className="text-red-500 text-sm">{errors.height.message}</p>
            )}
          </div>
          <div>
            <label>Weight (kg)</label>
            <input
              type="number"
              {...register("weight")}
              className="input bg-[#f4f5f6] mt-2 p-2 rounded-lg w-full"
            />
            {errors.weight && (
              <p className="text-red-500 text-sm">{errors.weight.message}</p>
            )}
          </div>
        </div>
        <div>
          <label>Email *</label>
          <input
            {...register("email")}
            className="input bg-[#f4f5f6] mt-2 p-2 rounded-lg w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Password *</label>
          <input
            type="password"
            {...register("password")}
            className="input bg-[#f4f5f6] mt-2 p-2 rounded-lg w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label>Payment Method</label>
          <div className="flex gap-4">
            {[
              {
                name: "Visa",
                icon: <VisaIcon />,
              },
              {
                name: "Mastercard",
                icon: <MasterCardIcon />,
              },
            ].map((method, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setValue("cardType", method.name)}
                className="rounded-lg flex-1 hover:bg-blue-100"
              >
                <span className="h-8 w-full">{method.icon}</span>
              </button>
            ))}
          </div>
          {errors.cardType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cardType.message}
            </p>
          )}
        </div>
        <Button
          className="w-full"
          isLoading={isSubmitting}
          text={"Register"}
          type="submit"
        />
      </form>
    </section>
  );
}
