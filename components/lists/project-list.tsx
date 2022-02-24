import { BiChevronUp } from "react-icons/bi";
import { Disclosure } from "@headlessui/react";
import ProjectPanel from "../ui/project-panel";
import {
  ProjectType,
} from "../../models/models";
import { useSession } from "next-auth/react";

const ProjectList: React.FC<{
    projects: [ProjectType]
}> = ({projects}) => {
  const { data: session, status } = useSession();
  const { id: userId } = session;


    if (!projects || projects.length < 1)
return <p className="mt-4 text-center">No Projects.</p>;

  return (
    <div className="w-full">
      <div className="w-full max-w-md mx-auto bg-white">
        <ul>
          {projects.map((project) => {
            return (
              <li key={project.id}>
                <Disclosure as="div" className="mt-2">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left border-2 text-black bg-white rounded-lg hover:shadow-md focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 transition duration-300">
                        <span>{project.name}</span>
                        <BiChevronUp
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-black`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <ProjectPanel project={project} projects={projects}/>
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

export default ProjectList;
