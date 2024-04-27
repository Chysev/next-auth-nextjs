import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center text-white gap-2">
      <Link href="/auth/login" className="hover:underline">
        Login
      </Link>
      <Link href="/auth/register" className="hover:underline">
        Register
      </Link>
    </div>
  );
};

export default page;
