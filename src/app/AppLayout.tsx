"use client";

import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import { useUser } from "./context/UserContext";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  return (
    <div className="flex bg-[#f4f5f6] min-h-screen text-[#1e1e1e]">
      {user && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
