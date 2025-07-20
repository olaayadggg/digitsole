"use client";

import { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  birthDay: string;
  nationality?: string;
  medicalSpecialty?: string;
  yearsMembership?: string;
  paymentMethod?: string;
  height?: string;
  weight?: string;
  cardType?: string;
  shoeSize?: string;
  membershipId?: string;
};
type Mode = "demo" | "pro" | null;

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  mode: null,
  setMode: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<Mode>(null);

  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    const savedMode = localStorage.getItem("currentMode") as Mode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  useEffect(() => {
    if (mode) {
      localStorage.setItem("currentMode", mode);
    } else {
      localStorage.removeItem("currentMode");
    }
  }, [mode]);
  return (
    <UserContext.Provider value={{ user, setUser, mode, setMode }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
