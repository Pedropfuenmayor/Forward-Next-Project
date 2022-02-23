import { BiChevronUp } from "react-icons/bi";
import { Disclosure } from "@headlessui/react";
import TaskPanel from "../ui/task-panel";
import {
  ActionType,
  getActionsByUserId,
  getActionsByUserIdVars,
  getProjectByUserId,
  getProjectByUserIdVars,
  ProjectType
} from "../../models/models";
import useSWR from "swr";
import { fetcher } from "../../helper/functions";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ACTIONS_BY_USER_ID, GET_PROJECT_BY_USER_ID } from "../../graphql/querys";
import { useSession } from "next-auth/react";

const TaskList: React.FC<{
    projects: [ProjectType]
}> = ({projects}) => {
  const { data: session, status } = useSession();
  const { id: userId } = session;
  const { loading: loadingAction, data: actionData } = useQuery<
    getActionsByUserId,
    getActionsByUserIdVars
  >(GET_ACTIONS_BY_USER_ID, {
    variables: {
      userId: +userId,
    },
    fetchPolicy:"network-only"
  });


  if (loadingAction)
return <p className="text-center">Loading...</p>;

if (!actionData.getActionsByUserId || actionData.getActionsByUserId.length === 0)
return <p className="mt-4 text-center">No Actions.</p>;


  return (
    <div className="w-full">
      <div className="w-full max-w-md mx-auto bg-white">
        <ul>
          {actionData.getActionsByUserId.map(({what, id}) => {
            return (
              <li key={id}>
                <Disclosure as="div" className="mt-2">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left border-2 text-black bg-white rounded-lg hover:shadow-md focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 transition duration-300">
                        <span>{what}</span>
                        <BiChevronUp
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-black`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <TaskPanel  projects ={projects} id={id as number}
                        />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
