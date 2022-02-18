import { useState } from "react";
import { Error, HelpText, IdeasExample, IdeaType } from "../models/models";
import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import DeleteModal from "../components/ui/delete-modal";
import ImpactEffortIdeaList from "./lists/impact-effort-list";
import { useRouter } from "next/router";

const IdeasImpactEffort: React.FC<{}> = (props) => {
  const [helpText, setHelpText] = useState<HelpText | false>(false);
  const [ideasExample, setIdeasExample] = useState<IdeasExample | false>(false);
  const [error, setError] = useState<Error | false>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIdea, setDeleteIdea] = useState<number | false>(false);

  const { loading: loadingIdeas, data: ideasData } = useQuery<
    getIdeasByChallenge,
    getIdeasByChallengeVars
  >(GET_IDEAS_BY_CHALLENGE_ID, {
    variables: {
      challengeId: +challengeId,
    },
  });

  const router = useRouter();
  const { IdeaType } = router.query;

  const hideHelpTextHandler = () => {
    setHelpText(false);
  };

  const hideIdeasExampleHandler = () => {
    setIdeasExample(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDeleteIdea(false);
  };

  const opendModal = (id) => {
    setIsOpen(true);
    setDeleteIdea(id);
  };

  const removeChallangeHandler = () => {
    if (deleteIdea === false) {
      return;
    } else {
      //delete
    }
    setIsOpen(false);
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-6xl w-8/12  text-center">
        "What is the level of <span className="text-blue-600">{IdeaType}</span> of each Idea?
      </h1>
      <p className="text-2xl mt-7 text-gray-200 hover:text-black transition duration-300">
        {props.subTitle}
      </p>
      <div className=" text-gray-200 w-44 flex justify-between">
        {/* <button
          className="hover:text-blue-600 transition duration-300"
          type="button"
          onClick={showHelpTextHandler}
        >
          Help Text
        </button>
        <button
          className="hover:text-blue-600 transition duration-300"
          type="button"
          onClick={showIdeasExampleHandler}
        >
          Examples
        </button> */}
      </div>
      <div className="flex justify-around items-center w-full">
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link href={props.prevPage}>
            <BsArrowLeftShort />
          </Link>
        </button>
        <ImpactEffortIdeaList
          type={props.type}
          list={props.ideasList}
          onOpen={opendModal}
          onRankUp={rankUpHandler}
          onRankDown={rankDownHandler}
        />

        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link href={props.nextPage}>
            <BsArrowRightShort />
          </Link>
        </button>
      </div>
      <DeleteModal
        onClose={closeModal}
        onRemove={removeChallangeHandler}
        isOpen={isOpen}
      />
    </section>
  );
};

export default IdeasImpactEffort;
