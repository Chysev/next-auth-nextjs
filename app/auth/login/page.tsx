// Client Session
"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Input from "@/components/Input";
import emailValidator from "@/lib/emailValidator";

const Login = () => {
  const router = useRouter();

  // Client Side
  const { data: Session } = useSession();
  if (Session) return redirect("/profile");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState<LoginState>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!emailValidator(login.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!login.password.trim()) {
      setError("Please enter your password");
      return;
    }

    await signIn("credentials", {
      redirect: false,
      email: login.email,
      password: login.password,
    }).then((error: any) => {
      console.log(error);
      router.push("/profile");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[390px] w-full">
      <div className="flex flex-col bg-[#131313] px-5 py-2 rounded-[16px] items-center">
        <div className="flex flex-col gap-3 w-full justify-center items-center">
          {error && <p className="text-red-500">{error}</p>}

          <div className="w-full grid gap-2">
            <label className="text-gray-100" htmlFor="email">
              Email
            </label>
            <Input
              type="text"
              name="name"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>

          <div className="w-full grid gap-2">
            <label className="text-gray-100" htmlFor="password">
              Password
            </label>
            <Input
              type="password"
              name="password"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <Link
              href="/auth/register"
              className="text-red-400 hover:text-green-400 text-[12px]"
            >
              Create account
            </Link>
          </div>

          {isLoading ? (
            <div className="text-gray-100 py-10">Logging in...</div>
          ) : (
            <button type="submit">
              <img
                src="/CHEVRON_BUTTON_LOGIN.svg"
                className="h-[100px] py-[14px]"
                alt="Login"
              />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
