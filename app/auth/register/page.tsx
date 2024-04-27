// Client Session
"use client";

import Link from "next/link";
import { useState } from "react";

import Axios from "../../../lib/Axios";
import Input from "@/components/Input";
import RegLog from "@/components/RegLog";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import emailValidator from "@/lib/emailValidator";

const Register = () => {
  // Client Side
  const { data: Session } = useSession();
  if (Session) return redirect("/profile");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [register, setRegister] = useState<RegisterState>({
    user: {
      name: "",
    },
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!register.user.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!emailValidator(register.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (register.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", register.user.name);
    formData.append("email", register.email);
    formData.append("password", register.password);

    await Axios.post("/api/auth/register", formData)
      .then((res) => {
        if (res && res.data) {
          setError(res.data);
        } else {
          console.error("Invalid response:", res);
          setError("Invalid response from server");
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          console.error("Error:", err);
          setError(err.response.data);
        } else {
          console.error("Invalid error response:", err);
          setError("Invalid error response from server");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[390px] w-full">
      <div className="flex flex-col bg-[#131313] px-5 py-5 rounded-[16px] items-center">
        <div className="flex flex-col gap-3 w-full justify-center items-center">
          {error && <p className="text-red-500">{error}</p>}

          <div className="w-full grid gap-2">
            <label className="text-gray-100" htmlFor="email">
              Name
            </label>

            <Input
              type="text"
              name="name"
              onChange={(e) =>
                setRegister((prevState) => ({
                  ...prevState,
                  user: {
                    ...prevState.user,
                    name: e.target.value,
                  },
                }))
              }
            />
          </div>

          <div className="w-full grid gap-2">
            <label className="text-gray-100" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              name="email"
              onChange={(e) =>
                setRegister({ ...register, email: e.target.value })
              }
            />
          </div>

          <div className="w-full grid gap-2">
            <label className="text-gray-100" htmlFor="password">
              Password
            </label>
            <Input
              type="password"
              name="password"
              onChange={(e) =>
                setRegister({ ...register, password: e.target.value })
              }
            />

            <Link
              href="/auth/login"
              className="text-red-400 hover:text-green-400 text-[12px]"
            >
              Login
            </Link>
          </div>

          {isLoading ? (
            <div className="text-gray-100">Registering...</div>
          ) : (
            <RegLog>Register</RegLog>
          )}
        </div>
      </div>
    </form>
  );
};

export default Register;
