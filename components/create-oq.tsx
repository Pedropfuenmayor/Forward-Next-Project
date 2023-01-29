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
  updateOQ,
  updateOQVars,
  deleteOQ,
  deleteOQVars,
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
  DELETE_OQ_BY_ID,
  GET_CHALLENGES_BY_PROJECT,
  GET_OQ_BY_CHALLENGE_ID,
  UPDATE_OQ_BY_ID,
} from "../graphql/querys";
import PhaseClose from "./phase-close";
import { uid } from "../helper/functions";
import { validateOQ } from "../helper/functions";

const CreateOpportunityQuestion: React.FC<{}> = () => {
  const [helpText, setHelpText] = useState<HelpText | false>(false);
  const [ideasExample, setIdeasExample] = useState<IdeasExample | false>(false);
  const [error, setError] = useState<Error | false>(false);
  const [isDoneOQ, setIsDoneOQ] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIdOQ, setDeleteIdOQ] = useState<number | false>(false);
  const OpportunityQuestionInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { project, challenge } = router.query;

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
    loading: loadingOQ,
    error: OQError,
    data: OQData,
  } = useQuery<getOQ, getOQVars>(GET_OQ_BY_CHALLENGE_ID, {
    variables: {
      challengeId: +challenge,
    },
  });

  const [
    createOQ,
    { loading: loadingCreatedChallenge, reset, error: createError },
  ] = useMutation<createOQ, createOQVars>(CREATE_OQ, {
    update(cache, { data }) {
      const { createOQ } = data;
      cache.writeQuery({
        query: GET_OQ_BY_CHALLENGE_ID,
        data: {
          getOQ: createOQ,
        },
        variables: {
          challengeId: +challenge,
        },
      });
    },
  });

  const [
    updateOQ,
    { loading: loadingUpdatedOQ, reset: resetUpdatedOQ, error: updateError },
  ] = useMutation<updateOQ, updateOQVars>(UPDATE_OQ_BY_ID);

  const [
    deleteOQ,
    { loading: loadingDeletedOQ, reset: resetDeleteddOQ, error: deleteError },
  ] = useMutation<deleteOQ, deleteOQVars>(DELETE_OQ_BY_ID, {
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_OQ_BY_CHALLENGE_ID,
        data: {
          getOQ: {
            id: 0,
            name: "OQ for this challenges was deleted",
            challenge_id: 0,
          },
        },
        variables: {
          challengeId: +challenge,
        },
      });
    },
  });

  if (loadingOQ || loadingChallenges)
    return <p className="text-center">Loading...</p>;

  if (challengesError)
    return <p className="text-center">`Error❗️${challengesError.message}`</p>;
  if (OQError)
    return <p className="text-center">`Error❗️${OQError.message}`</p>;
  if (updateError)
    return <p className="text-center">`Error❗️${updateError.message}`</p>;
  if (createError)
    return <p className="text-center">`Error❗️${createError.message}`</p>;
  if (deleteError)
    return <p className="text-center">`Error❗️${deleteError.message}`</p>;

  const selectedChallenge = challengesData.getChallengesByProject.find(
    (challengeSelec) => {
      return challengeSelec.id == challenge;
    }
  );

  const isOQ = validateOQ(OQData);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = OpportunityQuestionInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      setError({
        title: "Invalid OQ Name",
        message: "Please fill out the field.",
      });
      return;
    }

    OpportunityQuestionInputRef.current!.value = "";

    OpportunityQuestionInputRef.current!.focus();

    if (!isOQ) {
      createOQ({
        variables: {
          challengeId: +challenge,
          name: enteredText,
          createOqId: uid(),
        },
        optimisticResponse: {
          createOQ: {
            id: "temp-id",
            name: enteredText,
            challenge_id: +challenge,
            __typename: "OQ",
          },
        },
      })
        .then((res) => res)
        .catch((err) => console.log(err.networkError.result.errors));
    } else {
      updateOQ({
        variables: {
          name: enteredText,
          updateOqId: OQData.getOQ.id as number,
        },
        optimisticResponse: {
          updateOQ: {
            id: OQData.getOQ.id,
            name: enteredText,
            challenge_id: +challenge,
            __typename: "OQ",
          },
        },
      })
        .then((res) => res)
        .catch((err) => console.log(err.networkError.result.errors));
    }
  };

  const showHelpTextHandler = () => {
    setHelpText({
      title: "Opportunity Question",
      text: "Take your selected challenge and reframe it. Use questions like How can that be done? How can it be improved? What can improve it? What is important for...? Use whatever other question that makes you think about solutions.",
    });
  };

  const showIdeasExampleHandler = () => {
    setIdeasExample({
      sampleItem: "Solve team's biggest issues.",
      ItemName: "Sample Project Name",
      type: "Opportunity Question",
      examples: [
        "How might we reduce noise in the office for those who need quiet?",
        "How can we improve the atmosphere in the office?",
        "How can we communicate better?",
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
    setDeleteIdOQ(false);
  };

  const opendModal = (id) => {
    setIsOpen(true);
    setDeleteIdOQ(id);
  };

  const removeChallangeHandler = () => {
    if (deleteIdOQ === false) {
      return;
    } else {
      deleteOQ({
        variables: {
          deleteOqId: OQData.getOQ.id as number,
        },
        // optimisticResponse: {
        //   deleteOQ: {
        //     id: OQData.getOQ.id,
        //     name: OQData.getOQ.name,
        //     challenge_id: +challengeId,
        //     __typename: "OQ",
        //   },
        // },
      })
        .then((res) => res)
        .catch((err) => console.log(err));
      setIsOpen(false);
    }
  };
  if (isDoneOQ) {
    return <PhaseClose text="Opportunity Question Phase done" />;
  }

  const nextPageHandler = () => {
    if (!isOQ) {
      setError({
        title: "Invalid OQ Name",
        message: "Please fill out the field.",
      });
      return;
    }
    setIsDoneOQ(true);
    setTimeout(() => {
      router.push(`/ideas?project=${project}&challenge=${challenge}`);
    }, 1000);
  };

  const projectNameFieldClasses = error
    ? "block w-full text-2xl p-0.5 mb-2 rounded border-red-300 bg-red-100 sm:p-1 "
    : "block w-full text-2xl p-0.5 rounded bg-gray-200 mb-2 sm:p-1";

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center w-11/12 sm:text-5xl">
        Write an opportunity question<span className="text-blue-600">.</span>{" "}
        <span className="text-gray-400 text-2xl">(only one)</span>
      </h1>
      <p className="text-2xl mt-7 text-center w-11/12 text-gray-300 hover:text-black transition duration-300 capitalize">
        Challenge: {selectedChallenge.name}
      </p>
      <div className="mt-3 text-gray-300 w-44 flex justify-between">
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
            <Link
              href={`/opportunity_question/select?project=${project}`}
              passHref
            >
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
      <div className="w-full">
        <form
          onSubmit={submitHandler}
          className="max-w-full w-10/12 my-8 mx-auto sm:w-7/12"
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
      </div>
      {isOQ && (
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
