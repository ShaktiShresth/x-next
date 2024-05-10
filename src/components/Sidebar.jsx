"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-4 p-3">
      <Link href="/">
        <FaXTwitter className="size-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200" />
      </Link>

      <Link
        href="/"
        className="w-fit flex gap-2 items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200"
      >
        <HiHome className="size-7" />
        <span className="font-bold hidden xl:inline">Home</span>
      </Link>

      {session ? (
        <button
          className="w-48 h-9 text-white font-semibold rounded-full bg-blue-400 shadow-md hover:brightness-95 transition-all duration-200 hidden xl:inline"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="w-48 h-9 text-white font-semibold rounded-full bg-blue-400 shadow-md hover:brightness-95 transition-all duration-200 hidden xl:inline"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Sidebar;
