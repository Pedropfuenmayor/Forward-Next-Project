import { useRef, useState } from "react";
import {
  Error,
  HelpText,
  ChallengeType,
  IdeasExample,
  getProjectById,
  getProjectByIdVars,
  createChallengeVars,
  createChallenge,
} from "../models/models";
import HelpTextModal from "./ui/hepl-text-modal";
import Button from "./ui/button";
import IdeasExamplesModal from "./ui/ideas-example-modal";
import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import ChallengesList from "./lists/challenge-list";
// import DeleteModal from "./UI/DeleteModal";
import { uid } from "../helper/functions";
import { useMutation, useQuery} from "@apollo/client";
import { CREATE_CHALLENGE, GET_PROJECT_BY_ID } from "../graphql/querys";
import { useRouter } from "next/router";
// import { __Type } from "graphql";

const Challenges: React.FC<{}> = () => {
  const [helpText, setHelpText] = useState<HelpText | false>(false);
  const [ideasExample, setIdeasExample] = useState<IdeasExample | false>(false);
  const [error, setError] = useState<Error | false>(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [deleteChallange, setDeleteChallange] = useState<
  //   RemoveChallange | false
  // >(false);
  const challangeDescriptionInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { projectId } = router.query;
  const { challengeType } = router.query;

  const { loading, data: projectData } = useQuery<getProjectById, getProjectByIdVars>(
    GET_PROJECT_BY_ID,
    {
      variables: {
        getProjectByIdId: +projectId,
      },
    }
  );

  const [
    createChallenge,
    { loading: loadingCreatedChallenge, reset, error: mutationError },
  ] = useMutation<createChallenge, createChallengeVars>(CREATE_CHALLENGE
    , 
    {
    update(cache, { data }) {
      const {createChallenge} = data
      const {getProjectById} = projectData
      cache.writeQuery({
        query:GET_PROJECT_BY_ID ,
        data:{
          getProjectById: {
            ...getProjectById,
            challenges:[...getProjectById.challenges,createChallenge],
          }
        },
        variables:{
          getProjectByIdId: +projectId,
        }
      });
    },
  }
  );

  if (loading) return <p className="text-center">Loading...</p>;

  const challengesList = projectData.getProjectById.challenges.filter(
    (challenge) => challenge.challenge_type === challengeType
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = challangeDescriptionInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      setError({
        title: "Invalid Project Name",
        message: "Please fill the project name field",
      });
      return;
    }

    createChallenge({
      variables: {
        createChallengeId: uid(),
        name: enteredText,
        projectId: +projectId,
        challengeType: challengeType as string,
      },
      optimisticResponse: {
        createChallenge: {
          id:'temp-id',
          name: enteredText,
          project_id: +projectId,
          challenge_type: challengeType as string,
          __typename: "Challenge",
          is_selected:null,
        },
      },
    });

    challangeDescriptionInputRef.current!.value = "";

    challangeDescriptionInputRef.current!.focus();
  };


  const showIdeasExampleHandler = () => {
    setIdeasExample({
      sampleProjectName: "Solve team biggest issues.",
      type: "Drive Forward Challenges",
      examples: [
        "Good comunication",
        "Education program",
        "State of the art tech stack",
        "Free food 🤣",
      ],
    });
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

  // const closeModal = () => {
  //   setIsOpen(false);
  //   setDeleteChallange(false);
  // };

  const opendModal = (challangeId, projectId, challangeType) => {
    // setIsOpen(true);
    // setDeleteChallange({ challangeId, projectId, challangeType });
  };

  // const removeChallangeHandler = () => {
  //   if (deleteChallange === false) {
  //     return;
  //   } else {
  // //deleteChallenge
  //     setIsOpen(false);
  //   }
  // };

  

  const projectNameFieldClasses = error
    ? "block w-full text-2xl p-2 mb-2 rounded border-red-300 bg-red-100"
    : "block w-full text-2xl p-2 rounded bg-gray-200 mb-2";

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-4xl w-8/12 text-center">What will drive the project <span className="text-blue-600">{projectData.getProjectById.name}</span> forward?</h1>
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
          sampleProjectName={ideasExample.sampleProjectName}
          type={ideasExample.type}
          examples={ideasExample.examples}
          onConfirm={hideIdeasExampleHandler}
        />
      )}
      <div className="flex justify-around items-center w-full">
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link href={`/${projectId}/collect`} passHref>
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
          <Link href={`/${projectId}/collect/hold_back`} passHref>
            <a>
              <BsArrowRightShort />
            </a>
          </Link>
        </button>
      </div>
      <ChallengesList list={challengesList} onOpen={opendModal} />
      {/* <DeleteModal
        onClose={closeModal}
        onRemove={removeChallangeHandler}
        isOpen={isOpen}
      /> */}
    </section>
  );
};

export default Challenges;
