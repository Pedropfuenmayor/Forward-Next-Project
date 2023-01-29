import { useRef, useState } from "react";
import {
  Error,
  HelpText,
  IdeasExample,
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
  GET_IDEAS_BY_CHALLENGE_ID,
  GET_OQ_BY_CHALLENGE_ID,
} from "../graphql/querys";
import { useRouter } from "next/router";


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
  const { project, challenge } = router.query;
  

  const {
    loading: loadingIdeas,
    error: ideasError,
    data: ideasData,
  } = useQuery<getIdeasByChallenge, getIdeasByChallengeVars>(
    GET_IDEAS_BY_CHALLENGE_ID,
    {
      variables: {
        challengeId: +challenge,
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
          challengeId: +challenge,
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
          challengeId: +challenge,
        },
      });
    },
  });

  if (loadingOQ || loadingIdeas)
    return <p className="text-center">Loading...</p>;
  if (ideasError)
    return <p className="text-center">`Error❗️${ideasError.message}`</p>;
  if (OQError)
    return <p className="text-center">`Error❗️${OQError.message}`</p>;
  if (createError)
    return <p className="text-center">`Error❗️${createError.message}`</p>;
  if (deleteError)
    return <p className="text-center">`Error❗️${deleteError.message}`</p>;

  const isOQ = OQData && OQData.getOQ.id !== 0;

  const isIdeas = ideasData && ideasData.getIdeasByChallenge.length > 0;

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = challangeDescriptionInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      setError({
        title: "Invalid idea name",
        message: "Please fill out the field.",
      });
      return;
    }

    createIdea({
      variables: {
        challengeId: +challenge,
        name: enteredText,
        createIdeaId: uid(),
      },
      optimisticResponse: {
        createIdea: {
          id: "temp-id",
          name: enteredText,
          challenge_id: +challenge,
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
      examples: ["Sound Proofing", "Quiet Rooms", "No talk days"],
    });
  };

  const showHelpTextHandler = () => {
    setHelpText({
      title: "Ideas Creation",
      text: "“The best way to have a good idea is to have lots of ideas.” Putting Linus Pauling, American chemist, biochemist, peace activist, author, educator, and Novel Prize in Chemistry.",
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
      })
        .then((re) => re)
        .catch((err) => console.log(err.networkError.result.errors));
      setIsOpen(false);
    }
  };

  const nextPageHandler = () => {
    if (!isIdeas) {
      setError({
        title: "Invalid OQ Name",
        message: "Please fill out the field.",
      });
      return;
    }
    setIsDoneIdeas(true);
    setTimeout(() => {
      router.push(
        `/ideas/rank?project=${project}&challenge=${challenge}`
      );
    }, 1000);
  };

  const projectNameFieldClasses = error
    ? "block w-full text-2xl p-0.5 mb-2 rounded border-red-300 bg-red-100 sm:p-1 "
    : "block w-full text-2xl p-0.5 rounded bg-gray-200 mb-2 sm:p-1";

  return (
    <section className="flex flex-col justify-center items-center">
      {isOQ && (
        <h1 className="text-4xl w-8/12 text-center sm:text-5xl capitalize">
          {OQData.getOQ.name}
        </h1>
      )}
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
              href={`/opportunity_question/create?project=${project}&challenge=${challenge}`}
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
      <div className=" w-full">
        {/* {`/${projectId}/opportunity_question/${challengeId}/ideas`}  */}
        <form
          onSubmit={submitHandler}
          className="max-w-full w-10/12 my-8 mx-auto sm:w-7/12"
        >
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
          You need to write an opportunity question for this Challenge ❗️
        </p>
      )}
    </section>
  );
};

export default CreateIdeas;
