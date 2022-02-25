import { useRef, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { getActionByIdeaId, getActionByIdeaIdVars, getIdeasByChallenge, getIdeasByChallengeVars, HelpText, IdeasExample } from "../models/models";
import { BsArrowRightShort } from "react-icons/bs";
import Link from "next/dist/client/link";
import { useQuery } from "@apollo/client";
import { GET_ACTION_BY_IDEA_ID, GET_IDEAS_BY_CHALLENGE_ID } from "../graphql/querys";
import { useEffect } from "react";

const ActionCreated: React.FC<{}> = (props) => {
  const router = useRouter();
  const { projectId, challengeId, ideaId, actionId } = router.query;

  const { loading: loadingIdeas, data: ideasData } = useQuery<
    getIdeasByChallenge,
    getIdeasByChallengeVars
  >(GET_IDEAS_BY_CHALLENGE_ID, {
    variables: {
      challengeId: +challengeId,
    },
  });

  const { loading: loadingAction, data: actionData } = useQuery<
    getActionByIdeaId,
    getActionByIdeaIdVars
  >(GET_ACTION_BY_IDEA_ID, {
    variables: {
      ideaId: +ideaId,
    },
  });

  useEffect(() => {
    
    router.prefetch(`/dashboard`)
    
  }, [router])

if (loadingIdeas || loadingAction)
return <p className="text-center">Loading...</p>;

const idea = ideasData.getIdeasByChallenge.find(
    (idea) => idea.id === +ideaId
  );

  const nextPage = `/${projectId}/opportunity_question/${challengeId}/actions/impact_effort_scale`;

  return (
    <section className="flex flex-col justify-center items-center">
      <header className="text-center">
        <div className="flex items-center">
          <h1 className="text-4xl text-center">
            Action <span className="text-blue-600">Created</span>!
          </h1>
          <span className="text-3xl pl-7">🚀</span>
        </div>
        <p className="text-2xl mt-4 text-gray-200 hover:text-black transition duration-300">
          {idea.name}
        </p>
      </header>
      <section className="mt-2">
        <p className="font-bold text-1xl">Action</p>
        <p className="my-2 pl-10 text-1xl">{actionData.getActionByIdeaId.what}</p>
        <p className="font-bold my-2 text-1xl">When will be done?</p>
        <p className="my-2 pl-10 text-1xl">{actionData.getActionByIdeaId.due_date}</p>
        <p className="font-bold m2-2 text-1xl">Succes Criteria</p>
        <p className="my-2 pl-10 text-1xl">{actionData.getActionByIdeaId.succes_criteria}</p>
        <div className="text-blue-600 mt-2 w-68 flex items-center transition ease-in-out delay-15 hover:translate-x-2 duration-300">
          <Link href={nextPage} passHref>
            <a className="text-2xl">
              Create More Actions
            </a>
          </Link>
          <BsArrowRightShort className="pl-3 text-5xl" />
        </div>
      </section>
    </section>
  );
};

export default ActionCreated;
