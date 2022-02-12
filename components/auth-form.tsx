import { useState, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useInput from "../hooks/useInput";
import { uid } from "../helper/functions";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER, IS_PROJECT } from "../graphql/querys";
import { createUserVars, isProject, isProjectVars } from "../models/models";


const emailValidation = (email) => {
  if (!email.includes("@") || email.trim().length === 0) {
    return false;
  } else {
    return true;
  }
};

const passwordValidation = (password) => {
  if (password.trim().length < 7 || password.trim().length === 0) {
    return false;
  } else {
    return true;
  }
};

function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();
  const [isLogin, setIsLogin] = useState(true);
  const [signinLoading, setSigninLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [userStatus, setUserEstatus] = useState({
    userCreated: "",
    userError: "",
  });

  const [createUser, { loading, reset }] = useMutation<any, createUserVars>(CREATE_USER);

  const { loading: isLoadingUserProjects, data } = useQuery<isProject, isProjectVars>(IS_PROJECT, {
    variables: {
      userId: session ? session.id as number : 0,
    },
    skip: session ? false : true,
  });

  const {
    error: emailError,
    onBlurvalidation: onBlurvalidationEmail,
    onFocus: onFocusEmail,
    submisionTextDateValidation: submisionEmailValidation,
  } = useInput(emailValidation);

  const {
    error: passwordError,
    onBlurvalidation: onBlurvalidationPassword,
    onFocus: onFocusPassword,
    submisionTextDateValidation: submisionPasswordValidation,
  } = useInput(passwordValidation);

  if (isLoadingUserProjects) return <p className="text-center">Loading...</p>;

  if (data) {

    const { isProject } = data;

    if (isProject) {
  
        router.push("/dashboard");
      
    }else{

      router.push("/new_project");

    }

  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    submisionEmailValidation(enteredEmail);
    submisionPasswordValidation(enteredPassword);

    if (
      !emailValidation(enteredEmail) ||
      !passwordValidation(enteredPassword)
    ) {
      return;
    }

    if (isLogin) {
      setSigninLoading(true);
      signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      }).then((res) => {
        setSigninLoading(false);
        if (res.error) {
          setUserEstatus({
            userCreated: "",
            userError: res.error,
          });
          setTimeout(() => {
            setUserEstatus({
              userCreated: "",
              userError: "",
            });
            setIsLogin((prevState) => !prevState);
          }, 2000);
        }
      });
    } else {
      const userId = uid();
      createUser({
        variables: {
          createUserId: userId,
          password: enteredPassword,
          email: enteredEmail,
        },
      })
        .then((res) => {
          setUserEstatus({
            userCreated: "User Created",
            userError: "",
          });
          setTimeout(() => {
            setUserEstatus({
              userCreated: "",
              userError: "",
            });
            setIsLogin(true);
            reset();
          }, 2000);
        })
        .catch((err) => {
          reset();
          setUserEstatus({
            userCreated: "",
            userError: err.message,
          });
          setTimeout(() => {
            setUserEstatus({
              userCreated: "",
              userError: "",
            });
          }, 2000);
        });
    }
  }

  const emailFieldClasses = emailError
    ? "block w-full text-base p-0.5 mb-2 rounded border-red-300 bg-red-100"
    : "block w-full text-base p-0.5 rounded bg-gray-200 mb-2";

  const passwordFieldClasses = passwordError
    ? "block w-full text-base p-0.5 mb-2 rounded border-red-300 bg-red-100"
    : "block w-full text-base p-0.5 rounded bg-gray-200 mb-2";

  return (
    <section>
      <div className="m-auto text-center w-4/12 border rounded-md shadow-sm">
        <h1 className="mt-4">{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className="w-10/12 m-auto mt-4 text-left text-sm">
            <div className="flex justify-between">
              <label htmlFor="email">Email address</label>
              {emailError && (
                <p className="text-red-500">Enter a valid email.</p>
              )}
            </div>
            <input
              className={emailFieldClasses}
              type="email"
              id="email"
              ref={emailInputRef}
              onBlur={onBlurvalidationEmail}
              onFocus={onFocusEmail}
            />
          </div>
          <div className="w-10/12 m-auto mt-4 text-left text-sm">
            <div className="flex justify-between">
              <label htmlFor="password">Password</label>
              {passwordError && (
                <p className="text-red-500">Must be 7 caracters long.</p>
              )}
            </div>
            <input
              className={passwordFieldClasses}
              type="password"
              ref={passwordInputRef}
              onBlur={onBlurvalidationPassword}
              onFocus={onFocusPassword}
            />
          </div>
          <div>
            <button
              disabled={loading}
              onSubmit={submitHandler}
              className="inline-flex justify-center mt-4 px-4 py-1 text-sm font-sm text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition duration-300"
            >
              {isLogin
                ? signinLoading
                  ? "Submitting..."
                  : "Login"
                : loading
                ? "Submitting..."
                : "Create Account"}
            </button>
            <button
              className="block m-auto my-4 text-gray-400 hover:text-black transition duration-300"
              type="button"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </div>

      {userStatus.userCreated && (
        <div className="w-4/12 bg-gradient-to-r from-green-400 to-blue-400 rounded m-auto ">
          <p className="m-auto mt-6 text-center text-white text-base">
            User created, you can login.{" "}
            <span className="pl-5 text-base">🚀</span>
          </p>
        </div>
      )}

      {userStatus.userError && (
        <div className="w-4/12 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 rounded m-auto ">
          <p className="m-auto mt-6 text-center text-white text-base">
            {userStatus.userError} <span className="pl-2 text-xl">!</span>
          </p>
        </div>
      )}
    </section>
  );
}

export default AuthForm;
