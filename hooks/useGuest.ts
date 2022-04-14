import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { uid } from "../helper/functions";

export const useGuestUser =()=>{
const [signinLoading, setSigninLoading] = useState(false);
  const router = useRouter();

  const guestLogIn = () => {
    const uniqueId = uid();
    setSigninLoading(true);
    signIn("credentials", {
      redirect: false,
      email: `guestUser${uniqueId}@gu.com`,
      password: uniqueId,
    }).then((res) => {
      setSigninLoading(false);
      router.push("/intro");
    });
  };

  return {
    signinLoading,
    guestLogIn
  }
}