import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { uid } from "../helper/functions";

function UserType() {
  const [signinLoading, setSigninLoading] = useState(false);
  const router = useRouter();

  const guestLogIn = () => {
    const uniqueId = uid();
    setSigninLoading(true);
    signIn("credentials", {
      redirect: false,
      email: `guestUser${uniqueId}@gu.com`,
      password: uniqueId,
    }).then((res) => {
      setSigninLoading(false);
      router.push("/intro");
    });
  };

  return (
    <section className="m-auto mt-10 w-72 flex-col border rounded-md shadow-sm md:w-[25rem]">
      <button
        disabled={signinLoading}
        onClick={guestLogIn}
        className="m-auto mt-8 block px-4 py-1 w-8/12 sm:w-6/12 text-sm font-sm text-white bg-blue-600 border rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition duration-300"
      >
        {signinLoading ? "Loading..." : "Continue as a guest"}
      </button>
      <button className="m-auto mt-5 mb-8 block px-4 py-1 w-8/12 sm:w-6/12 text-sm font-sm text-gray-800 bg-gray-300 border  rounded-md hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition duration-300">
        <Link href="/login">Log in / Sign up</Link>
      </button>
    </section>
  );
}

export default UserType;
