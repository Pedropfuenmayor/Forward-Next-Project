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
  const [isDoneChallenges, setIsDoneChallenges] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteChallange, setDeleteChallange] = useState<
    number | string | false
  >(false);
  const router = useRouter();
  const { project, challenge } = router.query;

  const { loading: loadingIdeas, error: ideasError, data: ideasData } = useQuery<
    getIdeasByChallenge,
    getIdeasByChallengeVars
  >(GET_IDEAS_BY_CHALLENGE_ID, {
    variables: {
      challengeId: +challenge,
    },
  });

  const { loading: loadingOQ, error:OQError, data: OQData } = useQuery<getOQ, getOQVars>(
    GET_OQ_BY_CHALLENGE_ID,
    {
      variables: {
        challengeId: +challenge,
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
          challengeId: +challenge,
        },
      });
    },
  });

  if (loadingIdeas || loadingOQ)
    return <p className="text-center">Loading...</p>;
    if (ideasError)
    return <p className="text-center">`Error❗️${ideasError.message}`</p>;
  if (OQError)
    return <p className="text-center">`Error❗️${OQError.message}`</p>;
  if (deleteError)
    return <p className="text-center">`Error❗️${deleteError.message}`</p>;

  const ideasList = [...ideasData.getIdeasByChallenge].sort((a, b) => {
    return a.index - b.index;
  });

  const isIdeas = ideasData && ideasData.getIdeasByChallenge.length > 0;

  const showHelpTextHandler = () => {
    setHelpText({
      title: "Rank your ideas",
      text: "Once you finish, we will go to the next phase with the top 4 ideas. The most important point of this phase is to be relatively fast in choosing what to work on, you can always come back and iterate with a different rank constellation, but the most important is you go forward.",
    });
  };

  const hideHelpTextHandler = () => {
    setHelpText(false);
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
      router.push(`/actions?project=${project}&challenge=${challenge}`);
    }, 1000);
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center w-11/12 sm:text-5xl">
        Rank your Ideas<span className="text-blue-600">.</span>
      </h1>
      <p className="text-2xl mt-7 text-center w-11/12 text-gray-300 hover:text-black transition duration-300 capitalize">
        {OQData.getOQ.name}
      </p>
      <div className="mt-3 text-gray-300 w-44 flex justify-center">
        <button
          className="hover:text-blue-600 transition duration-300"
          type="button"
          onClick={showHelpTextHandler}
        >
          Help Text
        </button>
      </div>
      {helpText && (
        <HelpTextModal
          title={helpText.title}
          text={helpText.text}
          onConfirm={hideHelpTextHandler}
        />
      )}
      <div className="flex justify-center">
        <div className="pr-8 sm:pr-10">
          <div className="flex items-center mt-5 text-lg text-blue-600 transition ease-in-out delay-15 hover:-translate-x-1 duration-300">
            <BsArrowLeftShort className="text-3xl" />
            <Link
              href={`/ideas/create?project=${project}challenge=${challenge}}`}
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
        {isIdeas && (
          <IdeasDragAndDropList ideas={ideasList} onOpen={opendModal} />
        )}
        {!isIdeas && (
          <p className="text-center text-2xl">
            You need to write at least one idea ❗️
          </p>
        )}
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
