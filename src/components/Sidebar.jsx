"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome, HiDotsHorizontal } from "react-icons/hi";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col p-3 justify-between h-screen">
      <div className="flex flex-col gap-4">
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

      {session && (
        <div className="text-gray-700 text-sm flex items-center cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200">
          <img
            src={session.user.image}
            alt="user-img"
            className="size-10 rounded-full xl:mr-2"
          />
          <div className="hidden xl:inline">
            <h4 className="font-bold">{session.user.name}</h4>
            <p className="text-gray-500">@{session.user.username}</p>
          </div>
          <HiDotsHorizontal className="h-5 xl:ml-8 hidden xl:inline" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
