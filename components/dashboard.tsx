import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Error,
  getProjectByUserId,
  getProjectByUserIdVars,
  HelpText,
  IdeasExample,
} from "../models/models";
import HelpTextModal from "./ui/hepl-text-modal";
import IdeasExamplesModal from "./ui/ideas-example-modal";
import TaskList from "./lists/task-list";
import { AiOutlinePlusCircle } from "react-icons/Ai";
import ProjectsList from "./lists/project-list";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_BY_USER_ID } from "../graphql/querys";
import { useSession } from "next-auth/react";

const Dashboard: React.FC<{}> = (props) => {
  const { data: session, status } = useSession();
  const { id: userId } = session;
  const { loading: loadingProjects, data: projectsData } = useQuery<
    getProjectByUserId,
    getProjectByUserIdVars
  >(GET_PROJECT_BY_USER_ID, {
    variables: {
      userId: +userId,
    },
    fetchPolicy:"network-only"
  });

  if (loadingProjects)
  return <p className="text-center">Loading...</p>;

  return (
    <section className="flex flex-col items-center mb-40">
      <div className="w-3/6 rounded-lg">
        <p className="mt-8 text-2xl m-auto text-gray-600 border-b-2 w-10/12">
          Actions
        </p>
        <TaskList projects={projectsData.getProjectByUserId}/>
      </div>
      <div className="w-3/6 rounded-lg">
        <p className="mt-8 text-2xl m-auto text-gray-600 border-b-2 w-10/12">
          Projects
        </p>
        <ProjectsList projects={projectsData.getProjectByUserId} />
      </div>
      <Tippy
        arrow={false}
        content="New project"
        className="bg-gray-500 text-center text-white rounded px-1 py-0.5"
      >
        <div className="mt-2 m-auto text-center">
          <Link href="/new_project" passHref>
            <a>
              <AiOutlinePlusCircle className="text-3xl text-gray-200 hover:text-gray-400 cursor-pointer transition duration-300" />
            </a>
          </Link>
        </div>
      </Tippy>
    </section>
  );
};

export default Dashboard;
