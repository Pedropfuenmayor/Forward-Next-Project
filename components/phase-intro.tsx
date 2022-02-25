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
      <h1 className="text-6xl text-center">
        <span className="text-blue-600">{phaseName}</span> Phase<span className="text-blue-600">.</span>{" "}
      </h1>
      {/* <h2 className="text-4xl text-center mt-4">{props.subTitle}</h2> */}
      <div className="flex justify-between items-center w-full">
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link href={prevPage} passHref>
            <a>
              <BsArrowLeftShort />
            </a>
          </Link>
        </button>
        <p className="mt-8 text-lg w-2/4 text-center">{descriptionText}</p>
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link href={nextPage} passHref>
            <a>
              <BsArrowRightShort />
            </a>
          </Link>
        </button>
      </div>
    </section>
  );
};

export default PhaseIntro;
