import { useRef, useState } from "react";
import {
  Error,
  HelpText,
  IdeasExample,
  getProjectById,
  getProjectByIdVars,
  createChallengeVars,
  createChallenge,
  getChallengesByProject,
  getChallengesByProjectVars,
  deleteChallengeVars,
  deleteChallengeById,
} from "../models/models";
import HelpTextModal from "./ui/hepl-text-modal";
import Button from "./ui/button";
import IdeasExamplesModal from "./ui/ideas-example-modal";
import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import ChallengesList from "./lists/challenge-list";
import DeleteModal from "./ui/delete-modal";
import { uid } from "../helper/functions";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_CHALLENGE,
  DELETE_CHALLENGE_BY_ID,
  GET_CHALLENGES_BY_PROJECT,
  GET_PROJECT_BY_ID,
} from "../graphql/querys";
import { useRouter } from "next/router";
import PhaseClose from "./phase-close";


const Challenges: React.FC<{}> = () => {
  const [helpText, setHelpText] = useState<HelpText | false>(false);
  const [ideasExample, setIdeasExample] = useState<IdeasExample | false>(false);
  const [error, setError] = useState<Error | false>(false);
  const [isDoneChallenges, setIsDoneChallenges] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteChallange, setDeleteChallange] = useState<
    number | string | false
  >(false);
  const challangeDescriptionInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { projectId } = router.query;
  const { challengeType } = router.query;
  const isDriveforward = challengeType === "drive_forward";

  const { loading: loadingChallenges, data: challengesData } = useQuery<
    getChallengesByProject,
    getChallengesByProjectVars
  >(GET_CHALLENGES_BY_PROJECT, {
    variables: {
      projectId: +projectId,
    },
  });

  const { loading: loadingProject, data: projectData } = useQuery<
    getProjectById,
    getProjectByIdVars
  >(GET_PROJECT_BY_ID, {
    variables: {
      projectId: +projectId,
    },
  });

  const [
    createChallenge,
    { loading: loadingCreatedChallenge, reset, error: createError },
  ] = useMutation<createChallenge, createChallengeVars>(CREATE_CHALLENGE, {
    update(cache, { data }) {
      const { createChallenge } = data;
      const { getChallengesByProject } = challengesData;
      cache.writeQuery({
        query: GET_CHALLENGES_BY_PROJECT,
        data: {
          getChallengesByProject: [...getChallengesByProject, createChallenge],
        },
        variables: {
          projectId: +projectId,
        },
      });
    },
  });

  const [
    deleteChallenge,
    {
      loading: loadingdeleteChallenge,
      reset: resetDeleteChallenge,
      error: deleteError,
    },
  ] = useMutation<deleteChallengeById, deleteChallengeVars>(
    DELETE_CHALLENGE_BY_ID
    ,{
      update(cache, { data }) {
        const { deleteChallenge } = data;
        const { getChallengesByProject } = challengesData;
        cache.writeQuery({
          query: GET_CHALLENGES_BY_PROJECT,
          data: {
            getChallengesByProject: getChallengesByProject.filter(
              (challenge) => {
                return challenge.id !== deleteChallenge.id;
              }
            ),
          },
          variables: {
            projectId: +projectId,
          },
        });
      },
    }
  );

  if (loadingProject || loadingChallenges)
    return <p className="text-center">Loading...</p>;

  const challengesList = challengesData.getChallengesByProject;

  const challengesListByType = challengesList.filter(
    (challenge) => challenge.challenge_type === challengeType
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = challangeDescriptionInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      setError({
        title: "Invalid  challenge name",
        message: "Please fill the challenge field.",
      });
      return;
    }

    createChallenge({
      variables: {
        challengeId: uid(),
        name: enteredText,
        projectId: +projectId,
        challengeType: challengeType as string,
      },
      optimisticResponse: {
        createChallenge: {
          id: "temp-id",
          name: enteredText,
          challenge_type: challengeType as string,
          project_id: +projectId,
          index: null,
          is_selected: null,
          __typename: "Challenge",
        },
      },
    }).then(re=>re).catch(err=>console.log(err.networkError.result.errors))

    challangeDescriptionInputRef.current!.value = "";

    challangeDescriptionInputRef.current!.focus();
  };

  const showIdeasExampleHandler = () => {
    if (isDriveforward) {
      setIdeasExample({
        sampleItem: "Solve team biggest issues.",
        ItemName: 'Sample Project Name',
        type: "Drive Forward Challenges",
        examples: [
          "Good comunication",
          "Education program",
          "State of the art tech stack",
          "Free food 🤣",
        ],
      });
    } else {
      setIdeasExample({
        sampleItem: "Solve team biggest issues.",
        ItemName: 'Sample Project Name',
        type: "Hold Back Challenges",
        examples: [
          "Office is to loud",
          "Goals are not clear",
          "The coffee doesn't come from Colombia ☕ ",
        ],
      });
    }
  };

  const onFocus = () => {
    setError(false);
  };

  const hideHelpTextHandler = () => {
    setHelpText(false);
  };

  const hideIdeasExampleHandler = () => {
    setIdeasExample(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDeleteChallange(false);
  };

  const opendModal = (id: number) => {
    setIsOpen(true);
    setDeleteChallange(id);
  };

  const removeChallangeHandler = () => {
    if (isDeleteChallange) {
      const deletedChallange = challengesList.find((challenge) => {
        return challenge.id === isDeleteChallange;
      });
      const {
        id,
        name,
        project_id,
        is_selected,
        challenge_type,
        index,
        __typename,
      } = deletedChallange;

      deleteChallenge({
        variables: {
          challengeId: id as number,
        },
        optimisticResponse: {
          deleteChallenge: {
            id,
            name,
            project_id,
            is_selected,
            challenge_type,
            index,
            __typename,
          },
        },
      });
      setIsOpen(false);
    }
  };

  if (isDoneChallenges) {
    return <PhaseClose text="Create Phase done" />;
  }

  const nextPageHandler = () => {
    if (isDriveforward) {
      router.push(`/${projectId}/collect/hold_back`);
    } else {
      setIsDoneChallenges(true);
      setTimeout(() => {
        router.push(`/${projectId}/choose`);
      }, 1000);
    }
  };

  const previousPage = isDriveforward
    ? `/${projectId}/collect`
    : `/${projectId}/collect/drive_forward`;

  const projectNameFieldClasses = error
    ? "block w-full text-2xl p-2 mb-2 rounded border-red-300 bg-red-100"
    : "block w-full text-2xl p-2 rounded bg-gray-200 mb-2";

  return (
    <section className="flex flex-col justify-center items-center">
      {isDriveforward && (
        <h1 className="text-4xl w-8/12 text-center">
          What will drive the project{" "}
          <span className="text-blue-600">
            {projectData.getProjectById.name}
          </span>{" "}
          forward?
        </h1>
      )}
      {!isDriveforward && (
        <h1 className="text-4xl w-8/12 text-center">
          What is holding the project{" "}
          <span className="text-blue-600">
            {projectData.getProjectById.name}
          </span>{" "}
          back?
        </h1>
      )}
      {/* <p className="text-2xl mt-7 text-gray-200 hover:text-black transition duration-300">
        {props.subTitle}
      </p> */}
      <div className="mt-3 text-gray-200 w-44 flex justify-center">
        {/* <button
          className="hover:text-blue-600 transition duration-300"
          type="button"
          onClick={showHelpTextHandler}
        >
          Help Text
        </button> */}
        <button
          className="hover:text-blue-600 transition duration-300"
          type="button"
          onClick={showIdeasExampleHandler}
        >
          Examples
        </button>
      </div>
      {helpText && (
        <HelpTextModal
          title={helpText.title}
          text={helpText.text}
          onConfirm={hideHelpTextHandler}
        />
      )}
      {ideasExample && (
        <IdeasExamplesModal
          sampleItem={ideasExample.sampleItem}
          ItemName={ideasExample.ItemName}
          type={ideasExample.type}
          examples={ideasExample.examples}
          onConfirm={hideIdeasExampleHandler}
        />
      )}
      <div className="flex justify-around items-center w-full">
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link href={previousPage} passHref>
            <a>
              <BsArrowLeftShort />
            </a>
          </Link>
        </button>
        <form
          onSubmit={submitHandler}
          className="max-w-full w-7/12 my-8 mx-auto"
        >
          {/* <label className="block font-bold mb-2" htmlFor="text">
              Project Name
      </label> */}
          <input
            className={projectNameFieldClasses}
            type="text"
            id="text"
            onFocus={onFocus}
            ref={challangeDescriptionInputRef}
          />
          <div className="flex justify-between">
            <Button type="submit" onClick={undefined}>
              Add
            </Button>
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
        </form>
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <a onClick={nextPageHandler}>
            <BsArrowRightShort />
          </a>
        </button>
      </div>
      <ChallengesList list={challengesListByType} onOpen={opendModal} />
      <DeleteModal
        onClose={closeModal}
        onRemove={removeChallangeHandler}
        isOpen={isOpen}
      />
    </section>
  );
};

export default Challenges;
