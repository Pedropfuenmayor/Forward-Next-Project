import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PhaseIntro from "../../../../../components/phase-intro";

const ActionsIntroPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { projectId } = router.query;
  const { challengeId } = router.query;

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;

  const prevPage = `/${projectId}/opportunity_question/${challengeId}/ideas/rank`;

  const nextPage = `/${projectId}/opportunity_question/${challengeId}/actions/impact`;

  return (
    <PhaseIntro
      prevPage={prevPage}
      nextPage={nextPage}
      phaseName="Action"
      subTitle="What is the Opportunity Question Phase?"
      descriptionText="The goal of the Action phase is to take our prioritized ideas and create actions for making them happen."
    />
  );
};

export default ActionsIntroPage;