import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ActionCreated from "../../../../../../../components/created-action";

const ActionCreatedPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;

  return <ActionCreated />
};

export default ActionCreatedPage;