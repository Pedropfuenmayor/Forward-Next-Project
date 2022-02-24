import Link from "next/dist/client/link";
import { useSession, signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import React from "react";


const Navbar = () => {
  const {data:session} = useSession();
  const router = useRouter()

  function logoutHandler() {
    signOut();
    // {redirect: false, callbackUrl: 'http://localhost:3000/login'}
    window.location.href = `${process.env.URI}/login`
  }
  

  return (
    <header className="w-full h-20 bg-white flex items-center justify-center">
      <nav>
        <ul className="list-none text-gray-200 m-0 p-0 flex justify-center">
          {session && (
            <li className="mx-4 hover:text-black cursor-pointer transition duration-300">
              <Link href="/dashboard"> Dashboard </Link>
            </li>
          )}
          {session && (
            <li className="mx-4 hover:text-black cursor-pointer transition duration-300">
              <button onClick={logoutHandler} className="bg-transparent">
                Logout
              </button>
            </li>
          )}
          {session && (
            <li className="text-2xl flex mx-4 hover:text-black cursor-pointer transition duration-300">
              <Link href="/profile" passHref>
              <a><CgProfile /></a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;