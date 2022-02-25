import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PhaseIntro from "../../../components/phase-intro";


const OQIntroPage: NextPage = () => {
const { status } = useSession();
  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {
    
    router.prefetch(`/${projectId}/opportunity_question/select`)
    
  }, [router,projectId])


  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;
  
  const prevPage = `/${projectId}/collect/rank`;

  const nextPage = `/${projectId}/opportunity_question/select`;

  return (
      <PhaseIntro
        prevPage={prevPage}
        nextPage={nextPage}
        phaseName="Opportunity Question"
        subTitle="What is the Opportunity Question Phase?"
        descriptionText="The phase is very simple but very importat, here we will change our glasses and reframe our challenges in a way it stimulate the production of new idea towards the solutions."
      />
  );
};

export default OQIntroPage;