import { useRef, useState } from "react";
import {
  HelpText,
  IdeasExample,
  getIdeasByChallenge,
  getIdeasByChallengeVars,
  getOQ,
  getOQVars,
  deleteIdea,
  deleteIdeaVars,
} from "../models/models";
import HelpTextModal from "./ui/hepl-text-modal";
import IdeasExamplesModal from "./ui/ideas-example-modal";
import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import DeleteModal from "./ui/delete-modal";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_CHALLENGE,
  DELETE_CHALLENGE_BY_ID,
  DELETE_IDEA,
  GET_CHALLENGES_BY_PROJECT,
  GET_IDEAS_BY_CHALLENGE_ID,
  GET_OQ_BY_CHALLENGE_ID,
  GET_PROJECT_BY_ID,
} from "../graphql/querys";
import { useRouter } from "next/router";
import PhaseClose from "./phase-close";
import IdeasDragAndDropList from "./ui/ideas-drag-droo-list";

const IdeasRank: React.FC<{}> = () => {
  const [helpText, setHelpText] = useState<HelpText | false>(false);
  const [ideasExample, setIdeasExample] = useState<IdeasExample | false>(false);
  const [isDoneChallenges, setIsDoneChallenges] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteChallange, setDeleteChallange] = useState<
    number | string | false
  >(false);
  const router = useRouter();
  const { projectId } = router.query;
  const { challengeId } = router.query;

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

  if (loadingIdeas || loadingOQ) return <p className="text-center">Loading...</p>;

  const ideasList = ideasData.getIdeasByChallenge;

  const isIdeas = ideasData && ideasData.getIdeasByChallenge.length > 0;

  const showHelpTextHandler = () => {
    setHelpText({
      title: "Rank your ideas",
      text: "Once you finish we will go to the next phase with the top 4 ideas. The most importat point of this phase is to be relatively fast in choosing what to work on, you can always come back and iterate with a different rank constellation, but the most important is you go forward.",
    });
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
      const deletedIdea = ideasList.find((idea) => {
        return idea.id === isDeleteChallange;
      });
      const {
        id,
        name,
        challenge_id,
        is_selected,
        __typename,
        index,
        effort,
        impact,
      } = deletedIdea;

      deleteIdea({
        variables: {
          deleteIdeaId: id as number,
        },
        optimisticResponse: {
          deleteIdea: {
            id,
            name,
            challenge_id,
            is_selected,
            index,
            effort,
            impact,
            __typename,
          },
        },
      });
      setIsOpen(false);
    }
  };

  if (isDoneChallenges) {
    return <PhaseClose text="Idea Creation Phase done" />;
  }

  const nextPageHandler = () => {
    setIsDoneChallenges(true);
    setTimeout(() => {
      router.push(`/${projectId}/opportunity_question/${challengeId}/actions`);
    }, 1000);
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-6xl text-center">Rank your Ideas<span className="text-blue-600">.</span></h1>
      <p className="text-2xl mt-7 text-gray-200 hover:text-black transition duration-300">
        {OQData.getOQ.name}
      </p>
      <div className="mt-3 text-gray-200 w-44 flex justify-center">
        <button
          className="hover:text-blue-600 transition duration-300"
          type="button"
          onClick={showHelpTextHandler}
        >
          Help Text
        </button>
        {/* <button
          className="hover:text-blue-600 transition duration-300"
          type="button"
          onClick={showIdeasExampleHandler}
        >
          Examples
        </button> */}
      </div>
      <div className="mt-3 text-gray-200 w-44 flex justify-center">
        {/* <button
          className="hover:text-blue-600 transition duration-300"
          type="button"
          onClick={showHelpTextHandler}
        >
          Help Text
        </button> */}
      </div>
      {helpText && (
        <HelpTextModal
          title={helpText.title}
          text={helpText.text}
          onConfirm={hideHelpTextHandler}
        />
      )}
      {/* {ideasExample && (
        <IdeasExamplesModal
          sampleProjectName={ideasExample.sampleProjectName}
          type={ideasExample.type}
          examples={ideasExample.examples}
          onConfirm={hideIdeasExampleHandler}
        />
      )} */}
      <div className="flex justify-around items-center w-full">
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link href={`/${projectId}/opportunity_question/${challengeId}/ideas/create`} passHref>
            <a>
              <BsArrowLeftShort />
            </a>
          </Link>
        </button>
        {isIdeas && (
          <IdeasDragAndDropList ideas={ideasList} onOpen={opendModal} />
        )}
        {!isIdeas && (
          <p className="text-center text-2xl">
            You need to write at least one idea ❗️
          </p>
        )}
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
       
          <a onClick={nextPageHandler}>
            <BsArrowRightShort />
          </a>
        
        </button>
      </div>
      <DeleteModal
        onClose={closeModal}
        onRemove={removeChallangeHandler}
        isOpen={isOpen}
      />
    </section>
  );
};

export default IdeasRank;
