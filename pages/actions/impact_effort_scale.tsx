import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ImpactEffortScale from "../../components/impact-effort-scale";

const ImpactEffortScalePage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;

  return <ImpactEffortScale/>
};

export default ImpactEffortScalePage;