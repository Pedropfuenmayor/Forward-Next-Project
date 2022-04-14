import { NextPage } from "next";

const Section: NextPage = () => {
  return (
    <section className="bg-white mt-10">
      <div className="container px-6 py-8 mx-auto">
        <div className="items-center lg:flex">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 ">
              Who I am
            </h2>

            <p className="mt-4 text-gray-500  lg:max-w-md">
              Hi I am jane , software engineer{" "}
              <a
                className="font-bold text-blue-600 "
                href="#"
              >
                @BakaTeam
              </a>{" "}
              , Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum
              in sed non alias, fugiat, commodi nemo ut fugit corrupti dolorem
              sequi ex veniam consequuntur id, maiores beatae ipsa omnis
              aliquam?
            </p>

          </div>

          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <div className="flex items-center justify-center lg:justify-end">
              <div className="max-w-lg">
                <img
                  className="object-cover object-center w-full h-64 rounded-md shadow"
                  src="https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
