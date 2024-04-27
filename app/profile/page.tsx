// Server Session
"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import authOptions from "../api/auth/authOptions";
import Logout from "@/components/Logout";

const page = async () => {
  // Server Side
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/auth/login");

  return (
    <div className="text-white bg-[#131313] max-w-[300px] py-[10px] rounded-lg w-full items-center flex flex-col">
      <div className="flex flex-col">
        <p className="text-[24px] m-auto tracking-widest pb-2">
          Account Information
        </p>
        <div className="flex gap-2 items-center">
          <p className="text-[20px] font-semibold">Id:</p>
          <p className="text-[18px] text-[whitesmoke]">{session.user.id}</p>
        </div>

        <div className="flex gap-2 items-center">
          <p className="text-[20px] font-semibold">Name:</p>
          <p className="text-[18px] text-[whitesmoke]">{session.user.name}</p>
        </div>

        <div className="flex gap-2 items-center pb-5">
          <p className="text-[20px] font-semibold">Email:</p>
          <p className="text-[18px] text-[whitesmoke]">{session.user.email}</p>
        </div>

        <Logout />
      </div>
    </div>
  );
};

export default page;
