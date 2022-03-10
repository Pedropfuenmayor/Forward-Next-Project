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
import { useEffect } from "react";

const IdeasImpactEffort: React.FC<{}> = () => {
  const router = useRouter();
  const { projectId, challengeId, ideaType } = router.query;

  const {
    loading: loadingIdeas,
    error: ideasError,
    data: ideasData,
  } = useQuery<getIdeasByChallenge, getIdeasByChallengeVars>(
    GET_IDEAS_BY_CHALLENGE_ID,
    {
      variables: {
        challengeId: +challengeId,
      },
    }
  );

  const {
    loading: loadingOQ,
    error: OQError,
    data: OQData,
  } = useQuery<getOQ, getOQVars>(GET_OQ_BY_CHALLENGE_ID, {
    variables: {
      challengeId: +challengeId,
    },
  });

  useEffect(() => {
    router.prefetch(
      `/${projectId}/opportunity_question/${challengeId}/actions/impact_effort_scale`
    );
  }, [router, projectId, challengeId]);

  if (loadingOQ || loadingIdeas)
    return <p className="text-center">Loading...</p>;

  if (ideasError)
    return <p className="text-center">`Error❗️${ideasError.message}`</p>;
  if (OQError)
    return <p className="text-center">`Error❗️${OQError.message}`</p>;

  const selectedIdea = ideasData.getIdeasByChallenge.filter((_, index) => {
    return index <= 3;
  });

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center w-11/12 sm:text-5xl">
        What is the level of <span className="text-blue-600">{ideaType}</span>{" "}
        of each Idea?
      </h1>
      <p className="text-2xl mt-7 text-center w-11/12 text-gray-300 hover:text-black transition duration-300">
        {OQData.getOQ.name}
      </p>
      <div className="flex justify-center">
        <div className="pr-8 sm:pr-10">
          <div className="flex items-center mt-5 text-lg text-blue-600 transition ease-in-out delay-15 hover:-translate-x-1 duration-300">
            <BsArrowLeftShort className="text-3xl" />
            <Link
              href={
                ideaType === "impact"
                  ? `/${projectId}/opportunity_question/${challengeId}/actions`
                  : `/${projectId}/opportunity_question/${challengeId}/actions/impact`
              }
              passHref
            >
              <a className="text-xl">Prev</a>
            </Link>
          </div>
        </div>
        <div className="pl-8 sm:pl-10">
          <div className="flex items-center mt-5 text-lg text-blue-600 transition ease-in-out delay-15 hover:translate-x-1 duration-300">
            <Link
              href={
                ideaType === "impact"
                  ? `/${projectId}/opportunity_question/${challengeId}/actions/effort`
                  : `/${projectId}/opportunity_question/${challengeId}/actions/impact_effort_scale`
              }
              passHref
            >
              <a className="text-xl">Next</a>
            </Link>
            <BsArrowRightShort className="text-3xl" />
          </div>
        </div>
      </div>
      <div className="w-full">
        <ImpactEffortIdeaList type={ideaType as string} ideas={selectedIdea} />
      </div>
    </section>
  );
};

export default IdeasImpactEffort;
