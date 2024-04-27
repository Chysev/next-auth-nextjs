"use client";

import React from "react";
import { signOut } from "next-auth/react";
import RegLog from "./RegLog";

const Logout = () => {
  const Logout = () => {
    signOut();
  };
  return <RegLog onClick={Logout}>Logout</RegLog>;
};

export default Logout;
