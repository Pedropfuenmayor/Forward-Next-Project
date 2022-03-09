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

  const [createUser, { loading, reset }] = useMutation<any, createUserVars>(
    CREATE_USER
  );

  const { loading: isLoadingUserProjects, data } = useQuery<
    isProject,
    isProjectVars
  >(IS_PROJECT, {
    variables: {
      userId: session ? (session.id as number) : 0,
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
    const { getProjectByUserId } = data;

    if (getProjectByUserId.length > 0) {
      router.push("/projects_actions");
    } else {
      router.push("/intro");
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
            if(res.error !== 'Invalid password!'){
              setIsLogin((prevState) => !prevState);
            }
            
          }, 1000);
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
      <div className="m-auto text-center w-80 border rounded-md shadow-sm md:w-[25rem]">
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
        
    <div className="flex w-72 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-10 md:w-full">
    <div className="flex items-center justify-center w-12 bg-emerald-500">
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"/>
        </svg>
    </div>
    
    <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
            <span className="font-semibold text-emerald-500 ">Success</span>
            <p className="text-sm text-gray-600 ">Your account was created!</p>
        </div>
    </div>
</div>
      )}

      {userStatus.userError && (
         <div className="flex w-72 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-10 md:w-full">
         <div className="flex items-center justify-center w-12 bg-red-500">
             <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                 <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"/>
             </svg>
         </div>
         
         <div className="px-4 py-2 -mx-3">
             <div className="mx-3">
                 <span className="font-semibold text-red-500 ">Error</span>
                 <p className="text-sm text-gray-600 ">{userStatus.userError}</p>
             </div>
         </div>
     </div>
      )}
    </section>
  );
}

export default AuthForm;
