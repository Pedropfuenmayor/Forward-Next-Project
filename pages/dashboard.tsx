import type { NextPage } from "next";
import Dashboard from "../components/dashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";



const DashboardPage: NextPage = (props) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;

  

 return (
   <Dashboard />
 )
};

export default DashboardPage;