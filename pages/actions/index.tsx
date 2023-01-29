import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PhaseIntro from "../../components/phase-intro";

const ActionsIntroPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { project, challenge } = router.query;

  useEffect(() => {
    router.prefetch(
      `/actions/impact?project=${project}&challenge=${challenge}`
    );
  }, [router, project, challenge]);

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;

  const prevPage = `/ideas/rank?project=${project}&challenge=${challenge}`;

  const nextPage = `/actions/impact?project=${project}&challenge=${challenge}`;

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
