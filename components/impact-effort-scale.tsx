import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  GET_IDEAS_BY_CHALLENGE_ID,
  GET_OQ_BY_CHALLENGE_ID,
} from "../graphql/querys";
import {
  getIdeasByChallenge,
  getIdeasByChallengeVars,
  getOQ,
  getOQVars,
} from "../models/models";
import ScaleList from "./lists/scale-list";

const ImpactEffortScale: React.FC<{}> = () => {
  const router = useRouter();
  const { projectId, challengeId } = router.query;

  const { loading: loadingIdeas, error:ideasError, data: ideasData } = useQuery<
    getIdeasByChallenge,
    getIdeasByChallengeVars
  >(GET_IDEAS_BY_CHALLENGE_ID, {
    variables: {
      challengeId: +challengeId,
    },
  });

  const { loading: loadingOQ, error:OQError, data: OQData } = useQuery<getOQ, getOQVars>(
    GET_OQ_BY_CHALLENGE_ID,
    {
      variables: {
        challengeId: +challengeId,
      },
    }
  );

  if (loadingOQ || loadingIdeas)
    return <p className="text-center">Loading...</p>;

    if (ideasError)
    return <p className="text-center">`Error❗️${ideasError.message}`</p>;
  if (OQError)
    return <p className="text-center">`Error❗️${OQError.message}`</p>;

  const selectedIdea = ideasData.getIdeasByChallenge.filter((idea) => {
    return idea.index <= 3;
  });

  const highImpactLowEffort = selectedIdea.filter(
    (idea) => idea.impact === true && idea.effort === false
  );

  const highImpactHighEffort = selectedIdea.filter(
    (idea) => idea.impact === true && idea.effort === true
  );

  const lowImpactLowEffort = selectedIdea.filter(
    (idea) => idea.impact === false && idea.effort === false
  );

  const lowImpactHighEffort = selectedIdea.filter(
    (idea) => idea.impact === false && idea.effort === true
  );

  const isHighImpactLowEffort = highImpactLowEffort.length > 0;
  const isHighImpactHighEffort = highImpactHighEffort.length > 0;
  const isLowImpactLowEffort = lowImpactLowEffort.length > 0;
  const isLowImpactHighEffort = lowImpactHighEffort.length > 0;

  const isIdeas =
    !isHighImpactLowEffort &&
    !isHighImpactLowEffort &&
    !isLowImpactLowEffort &&
    !isLowImpactHighEffort;

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center w-11/12 sm:text-5xl">
        Create Actions<span className="text-blue-600">.</span>
      </h1>
      <p className="text-2xl mt-7 text-center w-11/12 text-gray-300 hover:text-black transition duration-300">
        {OQData.getOQ.name}
      </p>
      <div className="flex items-center mt-5 text-lg text-blue-600 transition ease-in-out delay-15 hover:-translate-x-1 duration-300">
        <BsArrowLeftShort className="text-3xl" />
        <Link
          href={`/${projectId}/opportunity_question/${challengeId}/actions/effort`}
          passHref
        >
          <a className="text-xl">Prev</a>
        </Link>
      </div>
      {isIdeas &&
        <p className=" w-11/12 mt-10 text-center text-2xl">
          At least one idea needs to have both: level of impact and effort ❗️
        </p>
      }
      <div className="flex justify-around items-center w-full">
        <div className="flex flex-col w-5/6 sm:w-3/6">
          {isHighImpactLowEffort && (
            <div className="my-7 pb-6 rounded-lg bg-gray-200 shadow-md">
              <p className="mt-8 text-2xl text-gray-600 text-center">
                High Impact / Low Effort
              </p>
              <ScaleList list={highImpactLowEffort} />
            </div>
          )}
          {isHighImpactHighEffort && (
            <div className="my-7 pb-6 rounded-lg  bg-gray-200 shadow-md">
              <p className="mt-8 text-2xl text-gray-600 text-center">
                High Impact / High Effort
              </p>
              <ScaleList list={highImpactHighEffort} />
            </div>
          )}
          {isLowImpactLowEffort && (
            <div className="my-7  pb-6 rounded-lg bg-gray-200">
              <p className="mt-8 text-2xl text-gray-600 text-center">
                Low Impact / Low Effort
              </p>
              <ScaleList list={lowImpactLowEffort} />
            </div>
          )}
          {isLowImpactHighEffort && (
            <div className="my-7 pb-6 rounded-lg bg-gray-200">
              <p className="mt-8 text-2xl text-gray-600 text-center">
                Low Impact / High Effort
              </p>
              <ScaleList list={lowImpactHighEffort} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImpactEffortScale;
