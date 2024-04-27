"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface RegLogProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: ReactNode;
}
const RegLog = ({ onClick, children }: RegLogProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#2a2a2a] hover:cursor-pointer hover:opacity-[0.8] w-full outline-none py-2 px-4 rounded-lg text-gray-100"
    >
      {children}
    </button>
  );
};

export default RegLog;
