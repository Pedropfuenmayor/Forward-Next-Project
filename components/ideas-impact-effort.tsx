import { useState } from "react";
import {
  getIdeasByChallenge,
  getIdeasByChallengeVars,
  getOQ,
  getOQVars,
} from "../models/models";
import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import ImpactEffortIdeaList from "./lists/impact-effort-list";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  GET_IDEAS_BY_CHALLENGE_ID,
  GET_OQ_BY_CHALLENGE_ID,
} from "../graphql/querys";

const IdeasImpactEffort: React.FC<{}> = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const { challengeId } = router.query;
  const { ideaType } = router.query;

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

  if (loadingOQ || loadingIdeas)
    return <p className="text-center">Loading...</p>;

    const selectedIdea = ideasData.getIdeasByChallenge.filter(
      (challenge) => {
        return challenge.index <= 3;
      }
    );


  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-6xl w-8/12  text-center">
        What is the level of <span className="text-blue-600">{ideaType}</span>{" "}
        each Idea?
      </h1>
      <p className="text-2xl mt-7 text-gray-200 hover:text-black transition duration-300">
        {OQData.getOQ.name}
      </p>
      <div className=" text-gray-200 w-44 flex justify-between">
      </div>
      <div className="flex justify-around items-center w-full">
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link
            href={
              ideaType === 'impact'?
              `/${projectId}/opportunity_question/${challengeId}/actions`:
              `/${projectId}/opportunity_question/${challengeId}/actions/impact`
            }
            passHref
          >
            <a>
              <BsArrowLeftShort />
            </a>
          </Link>
        </button>
        <ImpactEffortIdeaList
          type={ideaType as string}
          ideas={selectedIdea}
        />

        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link
            href={
              ideaType === 'impact'?
              `/${projectId}/opportunity_question/${challengeId}/actions/effort`:
              `/${projectId}/opportunity_question/${challengeId}/actions/impact_effort_scale`
            }
            passHref
          >
            <a>
              <BsArrowRightShort />
            </a>
          </Link>
        </button>
      </div>
    </section>
  );
};

export default IdeasImpactEffort;
