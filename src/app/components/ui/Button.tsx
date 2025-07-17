"use client";
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  text: string;
  type?: "button" | "submit";
  className?: string;
  isLoading?: boolean;
};

export default function Button({
  onClick,
  text,
  type = "button",
  className = "",
  isLoading = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`mt-4 px-8 py-4 cursor-pointer bg-blue-700 text-white text-lg font-medium rounded-xl hover:bg-blue-800 transition-all duration-300 ${className}`}
    >
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        text
      )}
    </button>
  );
}
