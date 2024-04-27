"use client";

import { FC, ChangeEvent } from "react";

interface PasswordInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  value?: any;
}

const Input: FC<PasswordInputProps> = ({ onChange, type, name, value }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      required
      className="w-full py-[6px] px-4 outline-none bg-[#070707] text-gray-100"
      onChange={onChange}
    />
  );
};

export default Input;
