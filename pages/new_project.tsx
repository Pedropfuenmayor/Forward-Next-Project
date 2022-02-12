import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProjectNameForm from "../components/project-name-form";


const NewProjectPage: NextPage = (props) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;

  if (status === "authenticated") return <ProjectNameForm />
};

export default NewProjectPage;