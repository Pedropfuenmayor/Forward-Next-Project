import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CreateIdeas from "../../../../../components/creat-ideas";

const IdeasCreatePage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;

  return <CreateIdeas /> ;
};

export default IdeasCreatePage;
