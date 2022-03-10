import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PhaseIntro from "../../../../../components/phase-intro";

const IdeasIntroPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { projectId, challengeId  } = router.query;
  

  useEffect(() => {
    
    router.prefetch(`/${projectId}/opportunity_question/${challengeId}/ideas/create`)
    
  }, [router,projectId,challengeId ])

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
      descriptionText="The goal of the Ideas Creation phase is to generate a lot of solutions to the prioritized problem. Ideas don’t need to be final or even well-thought-out – at this point, it’s more about creating possibilities.
      ​"
    />
  );
};

export default IdeasIntroPage;
