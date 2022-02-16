import { useRef, useState } from "react";

import {
  Error,
  HelpText,
  IdeasExample,
  getChallengesByProject,
  getChallengesByProjectVars,
  createOQ,
  createOQVars,
  getOQVars,
  getOQ,
} from "../models/models";
import HelpTextModal from "./ui/hepl-text-modal";
import Button from "./ui/button";
import { useRouter } from "next/router";
import IdeasExamplesModal from "./ui/ideas-example-modal";
import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import DeleteModal from "./ui/delete-modal";
import OpportunityList from "./lists/oq-list";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_OQ,
  GET_CHALLENGES_BY_PROJECT,
  GET_OQ_BY_CHALLENGE_ID,
} from "../graphql/querys";
import PhaseClose from "./phase-close";
import { uid } from "../helper/functions";

const CreateOpportunityQuestion: React.FC<{}> = () => {
  const [helpText, setHelpText] = useState<HelpText | false>(false);
  const [ideasExample, setIdeasExample] = useState<IdeasExample | false>(false);
  const [error, setError] = useState<Error | false>(false);
  const [isDoneOQ, setIsDoneOQ] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOQ, setDeleteOQ] = useState<number | false>(false);
  const OpportunityQuestionInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { projectId } = router.query;
  const { challengeId } = router.query;

  const { loading: loadingChallenges, data: challengesData } = useQuery<
    getChallengesByProject,
    getChallengesByProjectVars
  >(GET_CHALLENGES_BY_PROJECT, {
    variables: {
      projectId: +projectId,
    },
  });

  const { loading: loadingOQ, data: OQData } = useQuery<getOQ, getOQVars>(
    GET_OQ_BY_CHALLENGE_ID,
    {
      variables: {
        challengeId: +challengeId,
      },
    }
  );

  const [
    createOQ,
    { loading: loadingCreatedChallenge, reset, error: createError },
  ] = useMutation<createOQ, createOQVars>(
    CREATE_OQ,
    {update(cache, { data }) {
          const { createOQ } = data;
          cache.writeQuery({
            query: GET_OQ_BY_CHALLENGE_ID,
            data: {
              getOQ:createOQ 
            },
            variables: {
              challengeId: +challengeId,
            },
          });
        },
      });

  if (loadingOQ || loadingChallenges)
    return <p className="text-center">Loading...</p>;

  const challenge = challengesData.getChallengesByProject.find((challenge) => {
    return challenge.id == challengeId;
  });

  

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = OpportunityQuestionInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      setError({
        title: "Invalid Project Name",
        message: "Please fill the project name field",
      });
      return;
    }

    OpportunityQuestionInputRef.current!.value = "";

    OpportunityQuestionInputRef.current!.focus();

    if (!OQData) {
      createOQ({
        variables: {
          challengeId: +challengeId,
          name: enteredText,
          createOqId: uid(),
          
        },
        optimisticResponse: {
          createOQ: {
           id: "temp-id",
           name:enteredText,
           challenge_id:+challengeId,
           __typename: "OQ"
          },
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err.networkError.result.errors));
    }
  };

  const showHelpTextHandler = () => {
    setHelpText({
      title: "Opportunity Question",
      text: "Take your selected challenge and reframe it, use questions like: How that can be done? How it can be imporve? What can improve it? Use what ever other question that makes you think in terms of solutions.",
    });
  };

  const showIdeasExampleHandler = () => {
    setIdeasExample({
      sampleProjectName: "Solve team biggest issues.",
      type: "Opportunity Question",
      examples: [
        "How Might We reduce noise in the office for those who need quiet?",
        "How we state up to date with our tech stack?",
        "How we can have a McDonals in the officce? 🍔 🍟",
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

  const closeModal = () => {
    setIsOpen(false);
    setDeleteOQ(false);
  };

  const opendModal = (id) => {
    setIsOpen(true);
    setDeleteOQ(id);
  };

  const removeChallangeHandler = () => {
    if (deleteOQ === false) {
      return;
    } else {
      //delete
      setIsOpen(false);
    }
  };
  if (isDoneOQ) {
    return <PhaseClose text="Oppportunity Question Phase done!" />;
  }

  const nextPageHandler = () => {
    setIsDoneOQ(true);
    setTimeout(() => {
      router.push(`/${projectId}/ideas`);
    }, 1000);
  };

  const projectNameFieldClasses = error
    ? "block w-full text-2xl p-2 mb-2 rounded border-red-300 bg-red-100"
    : "block w-full text-2xl p-2 rounded bg-gray-200 mb-2";

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-6xl text-center">Write a opportunity question</h1>
      <p className="text-2xl mt-7 text-gray-200 hover:text-black transition duration-300">
        Challenge: {challenge.name}
      </p>
      <div className="mt-3 text-gray-200 w-44 flex justify-between">
        <button
          className="hover:text-blue-600 transition duration-300"
          type="button"
          onClick={showHelpTextHandler}
        >
          Help Text
        </button>
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
          <Link href={`/${projectId}/opportunity_question/select`} passHref>
            <a>
              <BsArrowLeftShort />
            </a>
          </Link>
        </button>
        <form
          onSubmit={submitHandler}
          className="max-w-full w-7/12 my-8 mx-auto"
        >
          <label className="hidden font-bold mb-2" htmlFor="text">
            Project Name
          </label>
          <input
            className={projectNameFieldClasses}
            type="text"
            id="text"
            onFocus={onFocus}
            ref={OpportunityQuestionInputRef}
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
      {OQData && (
        <OpportunityList
          opportunityQuestion={OQData.getOQ}
          onOpen={opendModal}
        />
      )}
      <DeleteModal
        onClose={closeModal}
        onRemove={removeChallangeHandler}
        isOpen={isOpen}
      />
    </section>
  );
};

export default CreateOpportunityQuestion;
