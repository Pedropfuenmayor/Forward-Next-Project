import { useState, useRef } from "react";
import useInput from "../hooks/useInput";
import { getSession, signOut } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { DELETE_USER, UPDATE_USER} from "../graphql/querys";
import { deleteUserVars, updateUserVars } from "../models/models";



const passwordValidation = (password) => {
  if (password.trim().length < 7 || password.trim().length === 0) {
    return false;
  } else {
    return true;
  }
};

const UserProfile = () => {
  const passwordInputRef = useRef<HTMLInputElement>();

  const newPasswordInputRef = useRef<HTMLInputElement>();

  const [isChange, setIsChange] = useState(true);

  const [userEmail, setUserEmail] = useState("");


  const [
    updateUser,
    {
      data: updateUserData,
      loading: isloadingUpdateUser,
      error: updateUserError,
      reset: resetUpdateUserState,
    },
  ] = useMutation<any, updateUserVars>(UPDATE_USER);

  const [
    deleteUser,
    {
      data: deleteUserData,
      loading: isloadingDeleteUser,
      error: deleteUserError,
      reset: resetDeleteUserSatate,
    },
  ] = useMutation<any, deleteUserVars>(DELETE_USER);

  const [userStatus, setUserEstatus] = useState({
    passwordChanged: "",
    userError: "",
  });

const logOut = ()=>{
  signOut({redirect: false, callbackUrl: '/login'});
  // window.location.href =  window.location.href = `${process.env.URI}/login`
}  

  const {
    error: passwordError,
    onBlurvalidation: onBlurvalidationPassword,
    onFocus: onFocusPassword,
    fieldClasses: passwordFieldClasses,
    submisionTextDateValidation: submisionPasswordValidation,
  } = useInput(passwordValidation);

  getSession().then((session) => {
    if (session) {
      setUserEmail(session.user.email);
    }
  });

  function switchAuthModeHandler() {
    setIsChange((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const oldPassword = passwordInputRef.current!.value;

    if (isChange) {
      const newPassword = newPasswordInputRef.current!.value;

      submisionPasswordValidation(newPassword);

      if (!passwordValidation(newPassword)) {
        return;
      }

      try {
        await updateUser({
          variables: {
            oldPassword,
            newPassword,
            email: userEmail,
          },
        });
        resetUpdateUserState();
        setUserEstatus({
          passwordChanged: "Password changed!",
          userError: "",
        });
        setTimeout(() => {
          setUserEstatus({
            passwordChanged: "",
            userError: "",
          });
        }, 4000);
      } catch (error) {
        setUserEstatus({
          passwordChanged: "",
          userError: error.message,
        });
        resetUpdateUserState();
        setTimeout(() => {
          setUserEstatus({
            passwordChanged: "",
            userError: "",
          });
        }, 4000);
      }
    } else {
      try {
        await deleteUser({
          variables: {
            password: oldPassword,
            email: userEmail,
          },
        });
        resetDeleteUserSatate()
        setUserEstatus({
          passwordChanged: "Account deleted!",
          userError: "",
        });
        setTimeout(() => {
          logOut()
          setUserEstatus({
            passwordChanged: "",
            userError: "",
          });
        }, 2000);
        
      } catch (error) {
        resetDeleteUserSatate()
        setUserEstatus({
          passwordChanged: "",
          userError: error.message,
        });
        setTimeout(() => {
          setUserEstatus({
            passwordChanged: "",
            userError: "",
          });
        }, 2000);
      }
    }
  }

  const userEmailParagraph = `(${userEmail})`;


  const buttonClass = isChange
    ? "inline-flex justify-center mt-4 px-4 py-1 text-sm font-sm text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition duration-300"
    : "inline-flex justify-center mt-4 px-4 py-1 text-sm font-sm text-white bg-red-500 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition duration-300";

  return (
    <section>
      <div className="m-auto mb-3 text-center w-4/12 border rounded-md shadow-sm">
        <h1 className="mt-4">User Profile</h1>
        <p className="text-gray-300 text-sm">{userEmailParagraph}</p>
        <form onSubmit={submitHandler}>
          <div className="w-10/12 m-auto mt-4 text-left text-sm">
            <h2 className="my-4">
              {isChange ? "Change password" : "Delete account"}
            </h2>
            <div className="flex justify-between">
              <label htmlFor="email">
                {isChange ? "Old password" : "Password required ❗"}
              </label>
              {/* {emailError && <p className="text-red-500">Enter a valid email.</p>} */}
            </div>
            <input
              className="block w-full text-base p-0.5 rounded bg-gray-200 mb-2"
              type="password"
              ref={passwordInputRef}
            />
          </div>
          {isChange && (
            <div className="w-10/12 m-auto mt-4 text-left text-sm">
              <div className="flex justify-between">
                <label htmlFor="password">New password</label>
                {/* {passwordError && (
              <p className="text-red-500">Enter a valid password.</p>
            )} */}
              </div>
              <input
                className={passwordFieldClasses}
                type="password"
                ref={newPasswordInputRef}
                onBlur={onBlurvalidationPassword}
                onFocus={onFocusPassword}
              />
              {passwordError && (
                <p className="text-red-500">Must be 7 caracters long.</p>
              )}
            </div>
          )}
          <div>
            <button onSubmit={submitHandler} className={buttonClass}>
              {isChange
                ? isloadingUpdateUser
                  ? "Submitting..."
                  : "Change password"
                : isloadingDeleteUser? "Submitting..." : "Delete account "}
            </button>
            <button
              className="block m-auto my-4 text-gray-400 hover:text-black transition duration-300"
              type="button"
              onClick={switchAuthModeHandler}
            >
              {isChange ? "Delete account " : "Change password"}
            </button>
          </div>
        </form>
      </div>
      {userStatus.passwordChanged && (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-10">
        <div className="flex items-center justify-center w-12 bg-emerald-500">
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"/>
            </svg>
        </div>
        
        <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
                <span className="font-semibold text-emerald-500 ">Success</span>
                <p className="text-sm text-gray-600 ">{userStatus.passwordChanged}</p>
            </div>
        </div>
    </div>
      )}
      {userStatus.userError && (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-10">
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
};

export default UserProfile;
