"use client";

import React from "react";
import Image from "next/image";
import foot from "@/app/public/images/Asset 1.svg";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function HeroSection() {
  const router = useRouter();
  const { user } = useUser();
  const handleStart = () => {
    user ? router.push(`/patients/${user.id}`) : router.push(`/auth/login`);
  };

  return (
    <section className="w-full px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-blue-900">
          Smart Gait & Body Analytics Dashboard
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Analyze your posture, foot pressure, body composition and gait pattern
          with our smart visual dashboard designed for medical and sports
          professionals.
        </p>
        <Button onClick={handleStart} text="Start Your Analysis" />
      </div>

      <div className="flex justify-center md:justify-end">
        <Image
          src={foot.src}
          alt="Foot Vector"
          width={250}
          height={250}
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
