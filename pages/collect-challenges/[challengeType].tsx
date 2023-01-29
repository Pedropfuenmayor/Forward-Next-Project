import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Challenges from "../../components/challenges";

const ChallengesPage: NextPage = () => {
const { status } = useSession();
  const router = useRouter();
  const { project } = router.query;

  useEffect(() => {
    
    router.prefetch(`/collect-challenges/rank?project=${project}`)
    
  }, [router,project])

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;

  
  return (
     <Challenges />
  );
};

export default ChallengesPage