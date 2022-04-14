/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  TemplateIcon,
  UserIcon,
  BeakerIcon,
  MenuAlt3Icon,
  LogoutIcon,
  PresentationChartBarIcon,
  XIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useGuestUser } from "../../hooks/useGuest";
import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBarNew() {
  const { signinLoading, guestLogIn } = useGuestUser();
  const router = useRouter();
  const isIndex = router.pathname === "/";
  const isUserType = router.pathname === "/user_type";
  const isLogin = router.pathname === "/login";
  const [isGuest, setIsGuest] = useState(false)


getSession().then((session) => {
  if (session) {
    if (/^guestUser/.test(session.user.email) && !isGuest){
      setIsGuest(true);
    }else if(!/^guestUser/.test(session.user.email) && isGuest){
      setIsGuest(false);
    }
  }
});

  function logoutHandler() {
    signOut({ redirect: false, callbackUrl: "/" });
    // window.location.href = `${process.env.URI}/login`
  }

  const profileFilter = (isGuest) => {
    const navigation = [
      {
        name: "Intro",
        description:
          "Get a better understanding of where your traffic is coming from.",
        href: "/intro",
        icon: PresentationChartBarIcon,
      },
      {
        name: "New Project",
        description:
          "Speak directly to your customers in a more meaningful way.",
        href: "/new_project",
        icon: BeakerIcon,
      },
      {
        name: "Projects-Actions",
        description: "Your customers' data will be safe and secure.",
        href: "/projects_actions",
        icon: TemplateIcon,
      },
      {
        name: "Profile",
        description:
          "Connect with third-party tools that you're already using.",
        href: "/profile",
        icon: UserIcon,
      },
      {
        name: "Logout",
        description:
          "Build strategic funnels that will drive your customers to convert",
        href: "#",
        icon: LogoutIcon,
        handler: logoutHandler,
      },
    ];

    if (isGuest) {
      return navigation.filter((obj) => obj.name !== "Profile");
    } else {
      return navigation;
    }
  };

  return (
    <Popover className="relative bg-white mb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-gray-100 py-6 lg:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">Workflow</span>
                <Image width={240} height={40} src="/Logo.png" />
              </a>
            </Link>
          </div>
          {!isUserType && !isLogin && (
            <div className={isIndex ? "-mr-2 -my-2 md:hidden" : "-mr-2 -my-2"}>
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600">
                <span className="sr-only">Open menu</span>
                <MenuAlt3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          )}
          {!isUserType && isIndex && (
            <div className="hidden md:flex mb-2 items-center justify-end md:flex-1 lg:w-0">
              <div className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                <Link href="/login">Sign in / Sign up</Link>
              </div>
              <button
                disabled={signinLoading}
                onClick={guestLogIn}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
              >
                {signinLoading ? "Loading..." : "Try as a guest"}
              </button>
            </div>
          )}
        </div>
      </div>

      {!isIndex && !isLogin && (
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Image width={180} height={30} src="/Logo.png" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {profileFilter(isGuest).map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a onClick={item.handler ? item.handler : null}>
                          <Popover.Button className="-my-3 p-3 w-full flex items-center rounded-md hover:bg-gray-50">
                            <item.icon
                              className="flex-shrink-0 h-6 w-6 text-blue-600"
                              aria-hidden="true"
                            />
                            <span className="ml-3 text-base font-medium text-gray-900">
                              {item.name}
                            </span>
                          </Popover.Button>
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      )}

      {isIndex && (
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Image width={180} height={30} src="/Logo.png" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div>
                  <Popover.Button
                    as="div"
                   
                  >
                  <button
                   disabled={signinLoading}
                   onClick={guestLogIn}
                   className="w-full mb-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {signinLoading ? "Loading..." : "Try as a guest"}
                    </button> 
                  </Popover.Button>
                  <Popover.Button
                    as="button"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-800 bg-gray-300 hover:bg-gray-400"
                  >
                    <Link href="/login">Sign in / Sign up</Link>
                  </Popover.Button>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      )}
    </Popover>
  );
}
function useSession(): { data: any } {
  throw new Error("Function not implemented.");
}
