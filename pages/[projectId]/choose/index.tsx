import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PhaseIntro from "../../../components/phase-intro";


const ChooseIntroPage: NextPage = () => {
const { status } = useSession();
  const router = useRouter();
  const { projectId } = router.query;


  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;
  
  const prevPage = `/${projectId}/collect/hold_back`;

  const nextPage = `/${projectId}/choose/rank`;

  return (
      <PhaseIntro
        prevPage={prevPage}
        nextPage={nextPage}
        phaseName="Choose"
        subTitle="What is the Choose Phase?"
        descriptionText="Now that you’ve collected the challenges and made them visual and easy to scan, it’s time choose what to work on, which problems to solve. And that’s really the simple
        goal of the Choose phase: ​To help you choose what to work on, what to focus on and what to ignore for now.
        "
      />
  );
};

export default ChooseIntroPage;