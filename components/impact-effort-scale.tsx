import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

  if (loadingOQ || loadingIdeas)
    return <p className="text-center">Loading...</p>;

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

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-6xl text-center">Create Actions</h1>
      <p className="text-2xl mt-7 text-gray-200 hover:text-black transition duration-300">
        {OQData.getOQ.name}
      </p>
      <div className="mt-3 text-gray-200 w-44 flex justify-center"></div>
      <div className="flex justify-around items-center w-full">
        {/* <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link href={props.prevPage}>
            <BsArrowLeftShort />
          </Link>
        </button> */}
        <div className="flex flex-col w-3/6">
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
        {/* <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link href={props.nextPage}>
            <BsArrowRightShort />
          </Link>
        </button> */}
      </div>
    </section>
  );
};

export default ImpactEffortScale;
