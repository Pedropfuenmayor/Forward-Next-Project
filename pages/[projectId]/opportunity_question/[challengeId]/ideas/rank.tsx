import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Ideas from "../../../../../components/creat-ideas";
import IdeasRank from "../../../../../components/ideas-rank";

const IdeasRankPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;

  return <IdeasRank />
};

export default IdeasRankPage;