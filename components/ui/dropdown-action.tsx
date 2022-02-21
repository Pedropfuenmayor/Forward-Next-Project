/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiMenu } from "react-icons/bi";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DropdownAction: React.FC<{ ideaId: number }> = (props) => {
  const router = useRouter();
  const { projectId, challangeId, ideaId} = router.query;

  const nextPage = `/${projectId}/opportunity_question/${challangeId}/action/create/${ideaId}`;

  const createActionHandler = () => {
    router.push(nextPage);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center">
        <Menu.Button>
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
        <Menu.Items className="origin-top-right absolute bg-white z-10 right-0 mt-2 w-36 rounded-md shadow-lg bg- ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item
              as="button"
              onClick={createActionHandler}
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
                  Create an Action
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownAction;