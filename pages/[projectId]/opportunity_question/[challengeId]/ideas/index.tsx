import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PhaseIntro from "../../../../../components/phase-intro";

const IdeasIntroPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { projectId } = router.query;
  const { challengeId } = router.query;

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;

  const prevPage = `/${projectId}/opportunity_question/${challengeId}/create`;

  const nextPage = `/${projectId}/opportunity_question/${challengeId}/ideas/create`;

  return (
    <PhaseIntro
      prevPage={prevPage}
      nextPage={nextPage}
      phaseName="Ideas Creation"
      subTitle="What is the Opportunity Question Phase?"
      descriptionText="The goal of the Ideas Creation phase  is to generate lots of solutions to the prioritized problem. Solutions don’t need to be final, or even well thought-out – at this point it’s more about creating a mass of solutions.
      ​"
    />
  );
};

export default IdeasIntroPage;
