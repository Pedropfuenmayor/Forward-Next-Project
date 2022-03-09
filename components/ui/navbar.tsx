import Link from "next/dist/client/link";
import { useSession, signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import { Fragment } from "react";
import React from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BiMenu, BiX } from "react-icons/bi";
import Image from "next/image";
import NavbarMenu from "./navbar-menu";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const navigation = [
    { name: "Intro", href: "/intro" },
    { name: "New Project", href: "/new_project" },
    { name: "Projects-Actions", href: "projects_actions" },
    { name: "Logout", href: "/logout" },
    { name: "Profile", href: "/profile" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const isIndex = router.pathname === "/";

  function logoutHandler() {
    signOut({ redirect: false, callbackUrl: "/" });
    // window.location.href = `${process.env.URI}/login`
  }

  return (
    <header
      className={`w-full h-20 bg-white flex items-center ${
        session ? "justify-center" : ""
      }`}
    >
      {/* {isIndex &&
      <div className='ml-11 mt-10 lg:ml-32 '>
      <Image
        src="/../public/Forward-logos_black.png"
        alt="Forward Logo"
        width={150}
        height={150}
        priority
      />
      </div>} */}
      {session && !isIndex && (
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto">
                <div className="flex items-center h-16">
                  <div className="sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="fixed top-7 right-[10%]">
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
                        {navigation.map((item, i) => (
                          <Link key={i} href={item.href}>
                            <a
                              className={classNames(
                                "text-gray-300 hover:text-black transition duration-300",
                                "px-3 py-2 "
                              )}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden bg-white fixed z-10 top-15 left-0 w-full h-full">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item, i) => (
                    <Disclosure.Button
                      as="div"
                      key={i}
                      className={classNames(
                        "text-black block px-10 py-3 text-base"
                      )}
                    >
                      <Link href={item.href}>{item.name}</Link>
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
