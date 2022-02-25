import { useMutation } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { DELETE_PROJECT, GET_PROJECT_BY_USER_ID } from "../../graphql/querys";
import {
  deleteProject,
  deleteProjectVars,
  ProjectType,
} from "../../models/models";
import DeleteModal from "./delete-modal";

const ProjectPanel: React.FC<{
  project: ProjectType;
  projects: [ProjectType];
}> = ({ project, projects }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteProject, setDeleteProject] = useState<boolean>(false);

  const [
    deleteProjectFunction,
    { loading: loadingDeletedOQ, reset: resetDeleteddOQ, error: deletedError },
  ] = useMutation<deleteProject, deleteProjectVars>(DELETE_PROJECT, {
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_PROJECT_BY_USER_ID,
        data: {
          getProjectByUserId: projects.filter((pro) => {
            return pro.id !== project.id;
          }),
        },
        variables: {
          userId: +project.user_id,
        },
      });
    },
  });

  const opendModal = () => {
    setIsOpen(true);
    setDeleteProject(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDeleteProject(false);
  };

  const removeChallangeHandler = () => {
    if (deleteProject) {
      deleteProjectFunction({
        variables: {
          projectId: project.id,
        },
      });
      setIsOpen(false);
    } else {
      return;
    }
  };

  const collectLink = `/${project.id}/collect`;

  const opportunityLink = `/${project.id}/opportunity_question`;

  const isChallenge = project.challenges.length !== 0;

  return (
    <div className="bg-gray-100 p-3 rounded-lg">
      <div className="text-blue-600 mt-2 w-44 flex items-center transition ease-in-out delay-15 hover:translate-x-1 duration-300">
        <Link href={collectLink} passHref>
          <button className="">Collect</button>
        </Link>
        <BsArrowRightShort className="text-xl" />
      </div>
      <div className={`text-blue-600 mt-2 flex items-center transition ease-in-out delay-15 hover:translate-x-1 duration-300 ${isChallenge? 'w-44':''}`}>
        <Link href={opportunityLink} passHref>
          <button
            className={isChallenge ? "" : "text-gray-300"}
            disabled={!isChallenge}
          >
            Opportunity Questions{isChallenge ? "" : "    (No Challenges yet)"}
          </button>
        </Link>
        {isChallenge && <BsArrowRightShort
          className={`text-xl ${isChallenge ? "" : "text-gray-300"}
            `}
        />}
      </div>
      <div className="mt-4 text-right">
        <DeleteModal
          onClose={closeModal}
          onRemove={removeChallangeHandler}
          isOpen={isOpen}
        />
        <button
          onClick={opendModal}
          type="button"
          className="inline-flex justify-center px-2 py-0.5 text-sm text-red-500 bg-gray-300 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectPanel;
