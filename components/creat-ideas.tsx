import { useRef, useState } from "react";
import {
  Error,
  HelpText,
  IdeasExample,
  getProjectById,
  getProjectByIdVars,
  getChallengesByProject,
  getChallengesByProjectVars,
  getOQ,
  getOQVars,
  getIdeasByChallenge,
  getIdeasByChallengeVars,
  createIdea,
  createIdeaVars,
  deleteIdea,
  deleteIdeaVars,
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
  
  CREATE_IDEA,
  
  DELETE_IDEA,
  GET_CHALLENGES_BY_PROJECT,
  GET_IDEAS_BY_CHALLENGE_ID,
  GET_OQ_BY_CHALLENGE_ID,
  GET_PROJECT_BY_ID,
} from "../graphql/querys";
import { useRouter } from "next/router";
import PhaseClose from "./phase-close";

const CreateIdeas: React.FC<{}> = () => {
  const [helpText, setHelpText] = useState<HelpText | false>(false);
  const [ideasExample, setIdeasExample] = useState<IdeasExample | false>(false);
  const [error, setError] = useState<Error | false>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDoneIdeas, setIsDoneIdeas] = useState(false);
  const [isDeleteChallange, setDeleteChallange] = useState<
    number | string | false
  >(false);
  const challangeDescriptionInputRef = useRef<HTMLInputElement>(null);
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

  const { loading: loadingProject, data: projectData } = useQuery<
    getProjectById,
    getProjectByIdVars
  >(GET_PROJECT_BY_ID, {
    variables: {
      projectId: +projectId,
    },
  });

  const { loading: loadingIdeas, data: ideasData } = useQuery<
    getIdeasByChallenge,
    getIdeasByChallengeVars
  >(GET_IDEAS_BY_CHALLENGE_ID, {
    variables: {
      challengeId: +challengeId,
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
    createIdea,
    { loading: loadingCreatedChallenge, reset, error: createError },
  ] = useMutation<createIdea, createIdeaVars>(CREATE_IDEA, {
    update(cache, { data }) {
      const { createIdea } = data;
      const { getIdeasByChallenge } = ideasData;
      cache.writeQuery({
        query: GET_IDEAS_BY_CHALLENGE_ID,
        data: {
          getIdeasByChallenge: [...getIdeasByChallenge, createIdea],
        },
        variables: {
          challengeId: +challengeId,
        },
      });
    },
  });

  const [
    deleteIdea,
    {
      loading: loadingdeleteChallenge,
      reset: resetDeleteChallenge,
      error: deleteError,
    },
  ] = useMutation<deleteIdea, deleteIdeaVars>(DELETE_IDEA, {
    update(cache, { data }) {
      const { deleteIdea } = data;
      const { getIdeasByChallenge } = ideasData;
      cache.writeQuery({
        query: GET_IDEAS_BY_CHALLENGE_ID,
        data: {
          getIdeasByChallenge: getIdeasByChallenge.filter((idea) => {
            return idea.id !== deleteIdea.id;
          }),
        },
        variables: {
          challengeId: +challengeId,
        },
      });
    },
  });

  if (loadingOQ || loadingIdeas)
    return <p className="text-center">Loading...</p>;

  const isOQ = OQData && OQData.getOQ.id !== 0;

  const isIdeas = ideasData && ideasData.getIdeasByChallenge.length > 0;

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = challangeDescriptionInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      setError({
        title: "Invalid idea name",
        message: "Please fill the idea name field",
      });
      return;
    }

    createIdea({
      variables: {
        challengeId: +challengeId,
        name: enteredText,
        createIdeaId: uid(),
      },
      optimisticResponse: {
        createIdea: {
          id: "temp-id",
          name: enteredText,
          challenge_id: +challengeId,
          index: null,
          is_selected: null,
          effort: null,
          impact: null,
          __typename: "Idea",
        },
      },
    })
      .then((re) => re)
      .catch((err) => console.log(err.networkError.result.errors));

    challangeDescriptionInputRef.current!.value = "";

    challangeDescriptionInputRef.current!.focus();
  };

  const showIdeasExampleHandler = () => {
    setIdeasExample({
      sampleItem:
        "How might We reduce noise in the office for those who need quiet?",
      ItemName: "Sample Challenge",
      type: "Ideas Creation",
      examples: [
        "Sound Proofing",
        "Quiet Rooms",
        "No talk days",
        "Noise Cancelling Headphones",
      ],
    });
  };

  const showHelpTextHandler = () => {
    setHelpText({
      title: "Ideas Creation",
      text: "“The best way to have a good idea is to have lots of ideas.” Putting Linus Pauling, American chemist, biochemist, peace activist, author, educator and Novel Prize in Chemistry.",
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
    setDeleteChallange(false);
  };

  const opendModal = (id: number) => {
    setIsOpen(true);
    setDeleteChallange(id);
  };

  const removeChallangeHandler = () => {
    if (isDeleteChallange) {
      const deletedIdea = ideasData.getIdeasByChallenge.find((challenge) => {
        return challenge.id === isDeleteChallange;
      });
      const {
        id,
        name,
        challenge_id,
        is_selected,
        effort,
        impact,
        index,
        __typename,
      } = deletedIdea;

      deleteIdea({
        variables: {
            deleteIdeaId: id as number,
        },
        optimisticResponse: {
          deleteIdea: {
            id,
            name,
            is_selected,
            challenge_id,
            index,
            effort,
            impact,
            __typename,
          },
        },
      }).then((re) => re)
      .catch((err) => console.log(err.networkError.result.errors))
      setIsOpen(false);
    }
  };

  const nextPageHandler = () => {
    if(!isIdeas){
      setError({
        title: "Invalid OQ Name",
        message: "Please fill the ideas field.",
      });
      return;
    }
    setIsDoneIdeas(true);
    setTimeout(() => {
      router.push(`/${projectId}/opportunity_question/${challengeId}/ideas/rank`);
    }, 1000);
  };

  const projectNameFieldClasses = error
    ? "block w-full text-2xl p-2 mb-2 rounded border-red-300 bg-red-100"
    : "block w-full text-2xl p-2 rounded bg-gray-200 mb-2";

  return (
    <section className="flex flex-col justify-center items-center">
      {isOQ && (
        <h1 className="text-4xl w-8/12 text-center">{OQData.getOQ.name}</h1>
      )}
      {/* <p className="text-2xl mt-7 text-gray-200 hover:text-black transition duration-300">
        {props.subTitle}
      </p> */}
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
          sampleItem={ideasExample.sampleItem}
          ItemName={ideasExample.ItemName}
          type={ideasExample.type}
          examples={ideasExample.examples}
          onConfirm={hideIdeasExampleHandler}
        />
      )}
      <div className="flex justify-around items-center w-full">
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link href={`/${projectId}/opportunity_question/${challengeId}/ideas`} passHref>
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
      <ChallengesList
        list={ideasData.getIdeasByChallenge}
        onOpen={opendModal}
      />
      <DeleteModal
        onClose={closeModal}
        onRemove={removeChallangeHandler}
        isOpen={isOpen}
      />
      {!isOQ && (
        <p className="text-center text-2xl">
          You need to write a opportunity question for this Challenge ❗️
        </p>
      )}
    </section>
  );
};

export default CreateIdeas;
