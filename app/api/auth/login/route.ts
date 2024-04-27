import bcrypt from "bcrypt";
import startDb from "@/startDb";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { email, password } = await req.json();

    const account = await startDb.account.findUnique({
      where: { email: email },
      include: {
        user: true,
      },
    });

    if (!account) return NextResponse.json("Account Not Found");

    const passwordMatch = await bcrypt.compare(password, account.password);

    if (!passwordMatch) return NextResponse.json("Invalid Credentials");

    return NextResponse.json({
      user: {
        id: account.id,
        email: account.email,
        name: account.user.name,
      },
    });
  } catch (error) {
    throw error;
  }
}
