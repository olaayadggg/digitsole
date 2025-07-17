"use client";
import {
  Home,
  Users,
  Settings,
  LifeBuoy,
  ClipboardList,
  PackageOpen,
} from "lucide-react";
import Link from "next/link";
import logo from "@/app/public/images/dLogo.png";
import { useUser } from "../context/UserContext";

export default function Sidebar() {
  const { user } = useUser();
  const navItems = [
    { name: "Home", icon: <Home size={20} />, path: "/" },
    {
      name: "Patients",
      icon: <Users size={20} />,
      path: `/patients/${user?.id}`,
    },
    { name: "Equipment", icon: <PackageOpen size={20} />, path: "/equipment" },
    {
      name: "Membership",
      icon: <ClipboardList size={20} />,
      path: "/membership",
    },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { name: "Support", icon: <LifeBuoy size={20} />, path: "/support" },
  ];
  return (
    <aside className="w-64 bg-[#1e3a8a] text-white min-h-screen flex flex-col">
      <div className="flex items-center p-6 justify-center h-20 border-b border-blue-900">
        <img src={logo.src} alt="Logo" />
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-800 transition text-white hover:text-white"
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
