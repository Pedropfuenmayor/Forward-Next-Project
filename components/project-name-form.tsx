import { useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Error,
  ProjectNameExample,
  HelpText,
  createProjectVars,
} from "../models/models";
import ProjectNameExampleModal from "../components/ui/project-name-example-modal";
import Button from "./ui/button";
import HelpTextModal from "../components/ui/hepl-text-modal";
import { uid } from "../helper/functions";
import { useSession } from "next-auth/react";
import { CREATE_PROJECT } from "../graphql/querys";
import { useMutation } from "@apollo/client";
import PhaseClose from "./phase-close";

const ProjectNameForm = () => {
  const [helpText, setHelpText] = useState<HelpText | false>(false);
  const [projectNameExample, setProjectNameExample] = useState<
    ProjectNameExample | false
  >(false);
  const [error, setError] = useState<Error | false>(false);
  const [isProject, setIsProject] = useState<boolean>(false);
  const router = useRouter();
  const projectNameInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const [createProject, { loading, reset, error: mutationError }] =
    useMutation<any, createProjectVars>(CREATE_PROJECT);

   

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const name = projectNameInputRef.current!.value;
    const id = uid();

    if (name.trim().length === 0) {
      setError({
        title: "Invalid Project Name",
        message: "Please enter a project.",
      });
      return;
    }

    createProject({
      variables: {
        createProjectId: id,
        name,
        userId: Number(session.id),
      },
    });
    setTimeout(() => {
      router.push(`/${id}/collect`);
    }, 1000);
    setIsProject(true);
  };

  const showIdeasExampleHandler = () => {

    setProjectNameExample({
      examples: [
        "Solve team biggest issues",
        "Improve the house interior",
        "Make more quality time",
      ],
    });
  };

  const onFocus = () => {
    setError(false);
  };

  const hideIdeasExampleHandler = () => {
    setProjectNameExample(false);
  };

  const showHelpTextHandler = () => {
    setHelpText({
      title: "Project Name",
      text: "Name you project in a way it describes the problem from a wide/general perspective. Try to use from 2-6 words",
    });
  };

  const hideHelpTextHandler = () => {
    setHelpText(false);
  };

  const projectNameFieldClasses = error
    ? "block w-full text-2xl p-0.5 mb-2 rounded border-red-300 bg-red-100 sm:p-1 "
    : "block w-full text-2xl p-0.5 rounded bg-gray-200 mb-2 sm:p-1";

  if (isProject) {
    return <PhaseClose text="Project created" />;
  }

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center sm:text-6xl w-11/12">
        Name your <span className="text-blue-600">Project</span>.
      </h1>
      <div className="mt-7 text-gray-300 w-44 flex justify-between">
        <button
          className="hover:text-blue-600 transition duration-300"
          type="button"
          onClick={showHelpTextHandler}
        >
          Help Text
        </button>
        <button
          className="hover:text-blue-600 transition duration-300"
          onClick={showIdeasExampleHandler}
        >
          Examples
        </button>
      </div>
      {projectNameExample && (
        <ProjectNameExampleModal
          examples={projectNameExample.examples}
          onConfirm={hideIdeasExampleHandler}
        />
      )}
      {helpText && (
        <HelpTextModal
          title={helpText.title}
          text={helpText.text}
          onConfirm={hideHelpTextHandler}
        />
      )}
      <form onSubmit={submitHandler} className="max-w-full w-9/12 my-8 mx-auto sm:w-7/12">
        <label className="hidden" htmlFor="text">
          Project Name
        </label>
        <input
          className={projectNameFieldClasses}
          type="text"
          id="text"
          onFocus={onFocus}
          ref={projectNameInputRef}
        />
        <div className="flex justify-between">
          <Button type="submit" onClick={undefined}>
            Create Project
          </Button>
          {error && <p className="text-red-500 text-sm sm:text-base">{error.message}</p>}
        </div>
      </form>
    </section>
  );
};

export default ProjectNameForm;
