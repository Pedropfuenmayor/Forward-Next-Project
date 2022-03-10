import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PhaseIntro from "../../../components/phase-intro";
import { useEffect } from "react";


const CollectIntroPage: NextPage = () => {
const { status } = useSession();
  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {
    
    router.prefetch(`/${projectId}/collect/drive_forward`)
    
  }, [router,projectId])

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;
  
  const prevPage = `/new_project`;

  const nextPage = `/${projectId}/collect/drive_forward`;

  return (
      <PhaseIntro
        prevPage={prevPage}
        nextPage={nextPage}
        phaseName="Collect"
        subTitle="What is the Collect Phase?"
        descriptionText="The goal of the Collect phase is to collect challenges and list them so you can decide what to work on in an organized way. Collect as much relevant information as possible."
      />
  );
};

export default CollectIntroPage;