import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  HelpText,
  IdeasExample,
  ChallengeType,
  getProjectById,
  getProjectByIdVars,
  getChallengesByProject,
  getChallengesByProjectVars,
} from "../models/models";
import HelpTextModal from "../components/ui/hepl-text-modal";
import IdeasExamplesModal from "../components/ui/ideas-example-modal";
import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import SelectChallangeList from "./lists/select-challenges-list";
import {
  GET_CHALLENGES_BY_PROJECT,
  GET_PROJECT_BY_ID,
} from "../graphql/querys";

const SelectChallange: React.FC<{}> = () => {
  const [helpText, setHelpText] = useState<HelpText | false>(false);
  const [ideasExample, setIdeasExample] = useState<IdeasExample | false>(false);
  const [selectedChallangeId, setSelectedChallangeId] = useState<string>("");
  const router = useRouter();
  const { projectId } = router.query;
  const { loading: loadingProject, data: projectData } = useQuery<
    getProjectById,
    getProjectByIdVars
  >(GET_PROJECT_BY_ID, {
    variables: {
      projectId: +projectId,
    },
  });

  const { loading: loadingChallenges, data: challengesData } = useQuery<
    getChallengesByProject,
    getChallengesByProjectVars
  >(GET_CHALLENGES_BY_PROJECT, {
    variables: {
      projectId: +projectId,
    },
  });

  if (loadingProject || loadingChallenges)
    return <p className="text-center">Loading...</p>;

  const selectedChallenges = challengesData.getChallengesByProject.filter(
    (challenge) => {
      return challenge.index <= 3;
    }
  );


  const showHelpTextHandler = () => {
    setHelpText({
      title: "Drive Forward Ideas",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae animi facilis ex eius numquam ratione, molestias id repellendus vero porro, quisquam veniam amet! Perferendis temporibus saepe quae, voluptatibus et deleniti doloremque praesentium sit quia tenetur vero, illo ipsa dolor voluptatum cum odio qui a! Deserunt consequatur harum explicabo. Ut provident explicabo obcaecati aut eligendi, alias repellat mollitia vel. Atque voluptatum excepturi doloremque, sunt repellendus labore rerum perspiciatis odio. Reprehenderit, alias id quibusdam quidem magni, nostrum non dolorem voluptas nemo repudiandae vitae blanditiis voluptates suscipit? Deserunt eveniet optio quasi nostrum? Cum aut iure, quisquam tempora nostrum hic odit quis enim, id qui voluptate aperiam praesentium beatae? Harum earum esse similique neque non iste, saepe rem reprehenderit eum sunt officia ut vero quisquam atque voluptate, nam obcaecati consequatur animi vitae. Maiores, cumque! Commodi expedita culpa laboriosam corporis obcaecati, a autem veritatis. Saepe maiores sapiente facilis similique itaque impedit minima voluptates deleniti minus.",
    });
  };

  const showIdeasExampleHandler = () => {
    setIdeasExample({
      sampleProjectName: "Limpiar La Casa",
      type: "Drive Forward Ideas",
      examples: ["test", "test2", "Yajuuuuuuuu"],
    });
  };

  const hideHelpTextHandler = () => {
    setHelpText(false);
  };

  const hideIdeasExampleHandler = () => {
    setIdeasExample(false);
  };

  const selectChallangeHandler = (challangeId) => {
    setSelectedChallangeId(challangeId);
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-6xl text-center">Select a Challenge</h1>
      <p className="text-2xl mt-7 text-gray-200 hover:text-black transition duration-300">
        {projectData.getProjectById.name} Project
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
      {helpText && (
        <HelpTextModal
          title={helpText.title}
          text={helpText.text}
          onConfirm={hideHelpTextHandler}
        />
      )}
      {ideasExample && (
        <IdeasExamplesModal
          sampleProjectName={ideasExample.sampleProjectName}
          type={ideasExample.type}
          examples={ideasExample.examples}
          onConfirm={hideIdeasExampleHandler}
        />
      )}
      <div className="flex justify-around items-center w-full">
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link href={`/${projectId}/opportunity_question`} passHref>
            <a>
              <BsArrowLeftShort />
            </a>
          </Link>
        </button>
        <SelectChallangeList
          onSelectChallanges={selectChallangeHandler}
          challenges={selectedChallenges}
        />
        <button className="text-gray-200 text-5xl hover:text-blue-600 transition duration-300 m-10">
          <Link
            href={`/${projectId}/opportunity_question/${selectedChallangeId}/create`}
            passHref
          >
            <a>
              <BsArrowRightShort />
            </a>
          </Link>
        </button>
      </div>
    </section>
  );
};

export default SelectChallange;
