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
import IdeasExamplesModal from "./ui/ideas-example-modal";
import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import DeleteModal from "./ui/delete-modal";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_CHALLENGE,
  DELETE_CHALLENGE_BY_ID,
  GET_CHALLENGES_BY_PROJECT,
  GET_PROJECT_BY_ID,
} from "../graphql/querys";
import { useRouter } from "next/router";
import PhaseClose from "./phase-close";
import ChallengesDragAndDropList from "./ui/challenges-drag-drop-list";

const ChallengesRank: React.FC<{}> = () => {
  const [helpText, setHelpText] = useState<HelpText | false>(false);
  const [ideasExample, setIdeasExample] = useState<IdeasExample | false>(false);
  const [isDoneChallenges, setIsDoneChallenges] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteChallange, setDeleteChallange] = useState<
    number | string | false
  >(false);
  const router = useRouter();
  const { project } = router.query;
  

  const { loading: loadingChallenges,error: challengesError, data: challengesData } = useQuery<
    getChallengesByProject,
    getChallengesByProjectVars
  >(GET_CHALLENGES_BY_PROJECT, {
    variables: {
      projectId: +project,
    },
  });

  const { loading: loadingProject, error: projectError, data: projectData } = useQuery<
    getProjectById,
    getProjectByIdVars
  >(GET_PROJECT_BY_ID, {
    variables: {
      projectId: +project,
    },
  });

  const [
    deleteChallenge,
    {
      loading: loadingdeleteChallenge,
      reset: resetDeleteChallenge,
      error: deleteError,
    },
  ] = useMutation<deleteChallengeById, deleteChallengeVars>(DELETE_CHALLENGE_BY_ID, 
    {
    update(cache, { data }) {
      const { deleteChallenge } = data;
      const { getChallengesByProject } = challengesData;
      cache.writeQuery({
        query: GET_CHALLENGES_BY_PROJECT,
        data: {
          getChallengesByProject: getChallengesByProject.filter((challenge) => {
            return challenge.id !== deleteChallenge.id;
          }),
        },
        variables: {
          projectId: +project,
        },
      });
    },
  }
  );

  if (loadingProject || loadingChallenges)
    return <p className="text-center">Loading...</p>;

    if (challengesError)
    return <p className="text-center">`Error❗️${challengesError.message}`</p>;
  if (projectError)
    return <p className="text-center">`Error❗️${projectError.message}`</p>;
  if (deleteError)
    return <p className="text-center">`Error❗️${deleteError.message}`</p>;

  const challengesList = challengesData.getChallengesByProject;

  const isChallenges = challengesData && (challengesData.getChallengesByProject.length > 0)

  const showHelpTextHandler = () => {
    setHelpText({
      title: "Rank your challenges",
      text: "Once you finish, we will go to the next phase with the top 4 challenges. The most important point of this phase is to be relatively fast in choosing what to work on, you can always come back and iterate with a different rank constellation, but the most important is you go forward.",
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
      const deletedChallange = challengesList.find((challenge)=>{
        return challenge.id === isDeleteChallange
      })
      const {id, name, project_id, is_selected, challenge_type, __typename, index} = deletedChallange;

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
              index,
              challenge_type,
              __typename
            
          },
        },
      });
      setIsOpen(false);
    }
  };

  if (isDoneChallenges) {
    return <PhaseClose text="Collect Phase done" />;
  }

  const nextPageHandler = () => {
      setIsDoneChallenges(true);
      setTimeout(() => {
        router.push(`/opportunity_question?project=${project}`);
      }, 1000);
  } 

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center sm:text-5xl w-11/12">Rank your Challenges<span className="text-blue-600">.</span></h1>
      <p className="text-xl mt-7 text-gray-300 hover:text-black transition duration-300 sm:text-2xl capitalize">
        {projectData.getProjectById.name} Project
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
      <div className='flex justify-center'>
      <div className="pr-8 sm:pr-10">
      <div className="flex items-center mt-5 text-lg text-blue-600 transition ease-in-out delay-15 hover:-translate-x-1 duration-300">
        <BsArrowLeftShort className="text-3xl" />
          <Link href={`/collect-challenges/hold_back?project=${project}`} passHref>
            <a className="text-xl">
              Prev
            </a>
          </Link>
        </div>
        </div>
        <div className="pl-8 sm:pl-10">
            <div className="flex items-center mt-5 text-lg text-blue-600 transition ease-in-out delay-15 hover:translate-x-1 duration-300">
                <a onClick={nextPageHandler} className="text-xl cursor-pointer">Next</a>
              <BsArrowRightShort className="text-3xl" />
            </div>
          </div>
      </div>
      {helpText && (
        <HelpTextModal
          title={helpText.title}
          text={helpText.text}
          onConfirm={hideHelpTextHandler}
        />
      )}
      <div className="w-full">
       {isChallenges && <ChallengesDragAndDropList challenges={challengesList} onOpen={opendModal}/>}
       {!isChallenges && <p className="text-center mt-10 text-2xl">You need to write at least one challenge ❗️</p>}
      </div>
      <DeleteModal
        onClose={closeModal}
        onRemove={removeChallangeHandler}
        isOpen={isOpen}
      />
    </section>
  );
};

export default ChallengesRank;