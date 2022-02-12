import type { NextPage } from "next";
import UserProfile from "../components/user-profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const Profile: NextPage = (props) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("./login");
    return <p className="text-center">unauthenticated</p>;
  }

  if (status === "loading") return <p className="text-center">Loading...</p>;

  if (status === "authenticated") return <UserProfile />;
};

export default Profile;
