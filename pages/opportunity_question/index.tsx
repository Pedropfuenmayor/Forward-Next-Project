import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PhaseIntro from "../../components/phase-intro";


const OQIntroPage: NextPage = () => {
const { status } = useSession();
  const router = useRouter();
  const { project } = router.query;

  useEffect(() => {
    
    router.prefetch(`/opportunity_question/select?project=${project}`)
    
  }, [router,project])


  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;
  
  const prevPage = `/collect-challenges/rank?project=${project}`;

  const nextPage = `/opportunity_question/select?project=${project}`;

  return (
      <PhaseIntro
        prevPage={prevPage}
        nextPage={nextPage}
        phaseName="Opportunity Question"
        subTitle="What is the Opportunity Question Phase?"
        descriptionText="The phase is very simple but very important here; you will reframe the challenges to stimulate the production of new ideas towards the solutions."
      />
  );
};

export default OQIntroPage;