import { NextPage } from "next";
import React from "react";
import Link from "next/link";
import { useGuestUser } from "../hooks/useGuest";

const Cta: NextPage = () => {
  const { guestLogIn, signinLoading } = useGuestUser();
  return (
    <section className="bg-white sm:mt-10">
      <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl ">
        Catch problems on the fly<br />  and generate solutions.
        </h2>

        <div className="mt-6 sm:-mx-2">
          <div className="inline-flex w-full sm:w-auto sm:mx-2">
            <button
              disabled={signinLoading}
              onClick={guestLogIn}
              className="inline-flex items-center justify-center w-full px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
              {signinLoading ? "Loading..." : "Try as a guest"}
            </button>
          </div>

          <div className="inline-flex w-full mt-4 sm:w-auto sm:mx-2 sm:mt-0">
            <Link href="/login">
              <a className='w-full'>
                <button className="inline-flex items-center justify-center w-full px-5 py-2 text-gray-700 transition-colors duration-150 transform bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring focus:ring-gray-200 focus:ring-opacity-80">
                  Sign up
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
