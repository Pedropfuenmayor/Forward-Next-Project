import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

const PhaseIntro: React.FC<{
  //   id: string;
  phaseName: string;
  subTitle: string;
  descriptionText: string;
  prevPage: string;
  nextPage: string;
}> = ({ prevPage, nextPage, phaseName, descriptionText }) => {
  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-5xl text-center w-11/12 sm:text-6xl">
        <span className="text-blue-600">{phaseName}</span> Phase
        <span className="text-blue-600">.</span>{" "}
      </h1>
      {/* <h2 className="text-4xl text-center mt-4">{props.subTitle}</h2> */}
      <div>
        <div className="flex justify-center">
          <div className="pr-8 sm:pr-10">
            <div className="flex items-center mt-8 text-lg text-blue-600 transition ease-in-out delay-15 hover:-translate-x-1 duration-300">
              <BsArrowLeftShort className="text-3xl" />
              <Link href={prevPage} passHref>
                <a className="text-xl">Prev</a>
              </Link>
            </div>
          </div>
          <div className="pl-8 sm:pl-10">
            <div className="flex items-center mt-8 text-lg text-blue-600 transition ease-in-out delay-15 hover:translate-x-1 duration-300">
              <Link href={nextPage} passHref>
                <a className="text-xl">Next</a>
              </Link>
              <BsArrowRightShort className="text-3xl" />
            </div>
          </div>
        </div>
        <p className="mt-8 m-auto text-base w-3/4 text-center sm:w-2/4 sm:text-lg">
          {descriptionText}
        </p>
      </div>
    </section>
  );
};

export default PhaseIntro;
