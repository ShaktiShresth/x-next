"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";
import { TbLogin } from "react-icons/tb";

const SessionButtonsXs = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <button
          className="w-fit p-2 hover:bg-blue-100 rounded-full transition-all duration-200 flex items-center sm:hidden"
          onClick={() => signOut()}
          title="Sign Out"
        >
          <PiSignOutBold className="size-6" />
        </button>
      ) : (
        <button
          className="w-fit p-2 hover:bg-blue-100 rounded-full transition-all duration-200 flex items-center sm:hidden"
          onClick={() => signIn()}
          title="Sign In"
        >
          <TbLogin className="size-6" />
        </button>
      )}
    </>
  );
};

export default SessionButtonsXs;
