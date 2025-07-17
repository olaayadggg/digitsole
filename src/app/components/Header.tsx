"use client";

import { LogOutIcon, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useEffect } from "react";
import logo from "@/app/public/images/dLogo.png";
export default function Header() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    console.log("user ya ola", user);
  }, [user]);
  return (
    <header className="h-20 px-6 flex items-center justify-between bg-[#1e3a8a] text-white border-b border-blue-900">
      <div className="flex items-center space-x-4">
        {!user && (
          <Link href={"/"} className="flex items-center justify-center mr-7">
            <img src={logo.src} alt="Logo" className="h-9" height={12} />
          </Link>
        )}
        <span className="bg-blue-700 text-sm font-medium px-3 py-1 rounded-full">
          Pro’s workspace
        </span>
        <button className="text-sm text-blue-100 bg-blue-900 px-3 py-1 rounded-full">
          Demo
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a patient..."
            className="pl-10 pr-4 py-2 border border-blue-600 rounded-lg bg-white text-blue-900 placeholder-blue-800 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-blue-700" size={18} />
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <Link
              title="Profile"
              href={"/profile"}
              className="text-base rounded-full h-full p-2 bg-white text-blue-600 font-semibold"
            >
              {`${user.firstName?.[0]?.toUpperCase() || ""}${
                user.lastName?.[0]?.toUpperCase() || ""
              }`}
            </Link>
            <button
              title="Logout"
              onClick={handleLogout}
              className="p-2 cursor-pointer rounded-full bg-blue-600"
            >
              <LogOutIcon />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/auth/login"
              className="text-sm bg-blue-700 p-2 rounded-full text-white"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="text-sm border rounded-full p-2 text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
