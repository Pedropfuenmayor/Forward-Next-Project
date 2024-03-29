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

const Challenges: React.FC<{}> = () => {
  const [helpText, setHelpText] = useState<HelpText | false>(false);
  const [ideasExample, setIdeasExample] = useState<IdeasExample | false>(false);
  const [error, setError] = useState<Error | false>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteChallange, setDeleteChallange] = useState<
    number | string | false
  >(false);
  const challangeDescriptionInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { project } = router.query;
  const { challengeType } = router.query;
  const isDriveforward = challengeType === "drive_forward";

  const {
    loading: loadingChallenges,
    error: challengesError,
    data: challengesData,
  } = useQuery<getChallengesByProject, getChallengesByProjectVars>(
    GET_CHALLENGES_BY_PROJECT,
    {
      variables: {
        projectId: +project,
      },
    }
  );

  const {
    loading: loadingProject,
    error: projectError,
    data: projectData,
  } = useQuery<getProjectById, getProjectByIdVars>(GET_PROJECT_BY_ID, {
    variables: {
      projectId: +project,
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
          projectId: +project,
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
    DELETE_CHALLENGE_BY_ID,
    {
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
            projectId: +project,
          },
        });
      },
    }
  );

console.log(project)

  if (loadingProject || loadingChallenges)
    return <p className="text-center">Loading...</p>;

  if (challengesError)
    return <p className="text-center">`Error❗️${challengesError.message}`</p>;
  if (projectError)
    return <p className="text-center">`Error❗️${projectError.message}`</p>;
  if (createError)
    return <p className="text-center">`Error❗️${createError.message}`</p>;
  if (deleteError)
    return <p className="text-center">`Error❗️${deleteError.message}`</p>;

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
        message: "Please fill out the field.",
      });
      return;
    }

    createChallenge({
      variables: {
        challengeId: uid(),
        name: enteredText,
        projectId: +project,
        challengeType: challengeType as string,
      },
      optimisticResponse: {
        createChallenge: {
          id: "temp-id",
          name: enteredText,
          challenge_type: challengeType as string,
          project_id: +project,
          index: null,
          is_selected: null,
          __typename: "Challenge",
        },
      },
    })
      .then((re) => re)
      .catch((err) => console.log(err.networkError.result.errors));

    challangeDescriptionInputRef.current!.value = "";

    challangeDescriptionInputRef.current!.focus();
  };

  const showIdeasExampleHandler = () => {
    if (isDriveforward) {
      setIdeasExample({
        sampleItem: "Solve team's biggest issues.",
        ItemName: "Sample Project Name",
        type: "Drive Forward Challenges",
        examples: [
          "Good communication",
          "Education program",
          "Bulletproof tech stack",
        ],
      });
    } else {
      setIdeasExample({
        sampleItem: "Solve team biggest issues.",
        ItemName: "Sample Project Name",
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

  const nextPageHandler = () => {
    if (isDriveforward) {
      router.push(`/collect-challenges/hold_back?project=${project}`);
      

    } else {
      setTimeout(() => {
        router.push(`/collect-challenges/rank?project=${project}`);
      }, 1000);
    }
  };

  const previousPage = isDriveforward
    ? `/collect-challenges/?project=${project}`
    : `/collect-challenges/drive_forward?project=${project}`;

  const projectNameFieldClasses = error
    ? "block w-full text-2xl p-0.5 mb-2 rounded border-red-300 bg-red-100 sm:p-1 "
    : "block w-full text-2xl p-0.5 rounded bg-gray-200 mb-2 sm:p-1";

  return (
    <section className="flex flex-col justify-center items-center">
      {isDriveforward && (
        <h1 className="text-4xl w-8/12 text-center">
          What will drive the project{" "}
          <span className="text-blue-600 capitalize">
            {projectData.getProjectById.name}
          </span>{" "}
          forward?
        </h1>
      )}
      {!isDriveforward && (
        <h1 className="text-4xl w-8/12 text-center">
          What is holding the project{" "}
          <span className="text-blue-600 capitalize">
            {projectData.getProjectById.name}
          </span>{" "}
          back?
        </h1>
      )}
      <div className="mt-3 text-gray-300 w-44 flex justify-center">
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
      <div className="flex justify-center">
        <div className="pr-8 sm:pr-10">
          <div className="flex items-center mt-5 text-lg text-blue-600 transition ease-in-out delay-15 hover:-translate-x-1 duration-300">
            <BsArrowLeftShort className="text-3xl" />
            <Link href={previousPage} passHref>
              <a className="text-xl">Prev</a>
            </Link>
          </div>
        </div>
        <div className="pl-8 sm:pl-10">
          <div className="flex items-center mt-5 text-lg text-blue-600 transition ease-in-out delay-15 hover:translate-x-1 duration-300">
            <a onClick={nextPageHandler} className="text-xl cursor-pointer">
              Next
            </a>
            <BsArrowRightShort className="text-3xl" />
          </div>
        </div>
      </div>
      <div className=" w-full">
        <form
          onSubmit={submitHandler}
          className="max-w-full w-10/12 mt-8 mb-4 mx-auto sm:w-7/12 sm:mb-8"
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
