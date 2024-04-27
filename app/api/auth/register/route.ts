import bcrypt from "bcrypt";
import startDb from "@/startDb";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();

    const user = await startDb.account.findUnique({
      where: { email: email },
      include: {
        user: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!user) {
      await startDb.account.create({
        data: {
          email: email,
          password: hashedPassword,
          user: {
            create: {
              name: name,
            },
          },
        } as any,
      });

      return NextResponse.json("Account Created");
    }
  } catch (error) {
    throw error;
  }
}
