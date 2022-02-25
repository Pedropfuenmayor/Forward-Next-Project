import Link from "next/link";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

const Intro: React.FC = () => {
  return (
    <section className="bg-white">
      <h1 className="text-5xl text-center md:text-6xl">
        Phases<span className="text-blue-600">.</span>
      </h1>
      <div className="container w-6/12 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h1 className="mt-4 text-xl font-semibold text-gray-800">
              Name your project.
            </h1>

            <p className="mt-2 text-gray-500">
              Short definition of the problem.
            </p>
          </div>

          <div>
            <h1 className="mt-4 text-xl font-semibold text-gray-800">
              Collect.
            </h1>

            <p className="mt-2 text-gray-500">
            Identify Challenges
            </p>
          </div>
          <div>
            <h1 className="mt-4 text-xl font-semibold text-gray-800">
              Opportunity question.
            </h1>

            <p className="mt-2 text-gray-500">
              Reframe challenges.
            </p>
          </div>
          <div>
            <h1 className="mt-4 text-xl font-semibold text-gray-800">
              Idea generation.
            </h1>

            <p className="mt-2 text-gray-500">
              Overcome challenges.
            </p>
          </div>
          <div>
            <h1 className="mt-4 text-xl font-semibold text-gray-800">
              Action.
            </h1>

            <p className="mt-2 text-gray-500">
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