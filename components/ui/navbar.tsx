import Link from "next/dist/client/link";
import { useSession, signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import { Fragment } from "react";
import React from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BiMenu, BiX } from "react-icons/bi";
import { useState } from "react";
import Image from "next/image";
import NavbarMenu from "./navbar-menu";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
 
let isGuest = false;
  
if(session){
  if(/^guestUser/.test(session.user.email)) isGuest = true
}

  function logoutHandler() {
    signOut({ redirect: false, callbackUrl: "/" });
    // window.location.href = `${process.env.URI}/login`
  }
const profileFilter = (isGuest)=>{
  const navigation = [
    { name: "Intro", href: "/intro" },
    { name: "New Project", href: "/new_project" },
    { name: "Projects-Actions", href: "/projects_actions" },
    { name: "Logout", href: "#", handler: logoutHandler },
    { name: "Profile", href: "/profile" },
  ];

  if(isGuest){
    return navigation.filter(obj=>obj.name !== 'Profile')
  }else{
    return navigation
  }

}

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const isIndex = router.pathname === "/" || router.pathname === "/user_type";

  return (
    <header
      className={`w-full h-20 bg-white flex items-center ${
        session ? "justify-center" : ""
      }`}
    >
      {isIndex && 
      <nav className='flex mt-10 mx-5 w-full justify-between items-center'>
        <div><Image width={200} height={200} src='/../public/Forward-logos_black.png'/></div>
        <Link href='/login'>Login</Link>
      </nav>}
      {session && !isIndex && (
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto">
                <div className="flex items-center h-16">
                  <div className="sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="bg-white fixed top-7 z-30 right-[10%]">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <BiX className="text-2xl text-black" />
                      ) : (
                        //  <MenuIcon className="block h-6 w-6" aria-hidden="true" />

                        <BiMenu className="text-2xl text-gray-300 hover:text-black transition duration-300" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                        {profileFilter(isGuest).map(({ name, href, handler }, i) => (
                          <Link key={i} href={href}>
                            <a
                              onClick={handler ? handler : null}
                              className={classNames(
                                "text-gray-300 hover:text-black transition duration-300",
                                "px-3 py-2 "
                              )}
                            >
                              {name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden bg-white fixed z-20 top-0 left-0 w-full h-full">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {profileFilter(isGuest).map(({ name, href, handler }, i) => (
                    <Disclosure.Button
                      as="div"
                      key={i}
                      className={classNames("px-10 py-3")}
                    >
                      <Link href={href}>
                        <a
                          className="text-black text-base hover:text-blue-600 transition duration-300"
                          onClick={handler ? handler : null}
                        >
                          {name}
                        </a>
                      </Link>
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </header>
  );
};

export default Navbar;
