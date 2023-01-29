import Link from "next/link";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

const Intro: React.FC = () => {
  return (
    <section className="bg-white">
      <h1 className="text-5xl text-center md:te xt-6xl">
        Phases<span className="text-blue-600">.</span>
      </h1>
      <div className="container w-6/12 py-6 mx-auto md:py-10">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-7">
          <div>
            <h1 className="mt-4 text-lg font-semibold text-gray-800 md:text-xl">
            <span className="text-blue-600">1.</span> Name your project.
            </h1>

            <p className="mt-1 text-gray-500 md:mt-2">
              Short definition of the problem.
            </p>
          </div>

          <div >
            <h1 className="mt-4 text-lg font-semibold text-gray-800 md:text-xl">
            <span className="text-blue-600">2.</span> Collect.
            </h1>

            <p className="mt-1 text-gray-500 md:mt-2">
            Identify Challenges
            </p>
          </div>
          <div >
            <h1 className="mt-4 text-lg font-semibold text-gray-800 md:text-xl">
            <span className="text-blue-600">3.</span> Opportunity question.
            </h1>

            <p className="mt-1 text-gray-500 md:mt-2">
              Reframe challenges.
            </p>
          </div>
          <div >
            <h1 className="mt-4 text-lg font-semibold text-gray-800 md:text-xl">
            <span className="text-blue-600">4.</span> Idea generation.
            </h1>

            <p className="mt-1 text-gray-500 md:mt-2">
              Overcome challenges.
            </p>
          </div>
          <div>
            <h1 className="mt-4 text-lg font-semibold text-gray-800 md:text-xl">
            <span className="text-blue-600">5.</span> Action.
            </h1>

            <p className="mt-1 text-gray-500 md:mt-2">
              Work on what matters.
            </p>
          </div>
        </div>
        <div className="flex items-center mt-8 text-lg text-blue-600 transition ease-in-out delay-15 hover:translate-x-1 duration-300">
          <Link href={'/new_project'} passHref>
            <a className="text-xl">
              Start
            </a>
          </Link>
          <BsArrowRightShort className="text-3xl" />
        </div>
      </div>
    </section>
  );
};

export default Intro;