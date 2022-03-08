/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavbarMenu: React.FC<{
    logoutHandler: () => void| undefined
}> = ({logoutHandler}) => {
  


  return (
    <Menu as="div" className="relative inline-block text-left sm:hidden">
      <div className="ml-72 text-2xl text-gray-500 hover:text-black transition duration-300">
        <Menu.Button className=''>
          <BiMenu />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute bg-white z-10 right-0 mt-2 w-32 rounded-md shadow-lg bg- ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item
              as="button"
              className="w-full text-left"
            >
              {({ active }) => (
                <Link href="/intro">
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Intro
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item
              as="button"
              className="w-full text-left"
            >
              {({ active }) => (
                <Link href="/new_project">
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    New Project
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item
              as="button"
              className="w-full text-left"
            >
              {({ active }) => (
                <Link href="/projects_actions">
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Projects/Actions
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item
              as="button"
              onClick={logoutHandler}
              className="w-full text-left"
            >
              {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Logout
                  </a>
              )}
            </Menu.Item>
            <Menu.Item
              as="button"
              className="w-full text-left"
            >
              {({ active }) => (
                <Link href="/profile">
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Profile
                  </a>
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavbarMenu;
