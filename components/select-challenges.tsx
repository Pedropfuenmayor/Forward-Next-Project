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
  // const [ideasExample, setIdeasExample] = useState<IdeasExample | false>(false);
  const [selectedChallangeId, setSelectedChallangeId] = useState<string>("");
  const router = useRouter();
  const { project} = router.query;
  const { loading: loadingProject, data: projectData } = useQuery<
    getProjectById,
    getProjectByIdVars
  >(GET_PROJECT_BY_ID, {
    variables: {
      projectId: +project,
    },
  });

  const { loading: loadingChallenges, data: challengesData } = useQuery<
    getChallengesByProject,
    getChallengesByProjectVars
  >(GET_CHALLENGES_BY_PROJECT, {
    variables: {
      projectId: +project,
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

  // const showIdeasExampleHandler = () => {
  //   setIdeasExample({
  //     sampleProjectName: "Limpiar La Casa",
  //     type: "Drive Forward Ideas",
  //     examples: ["test", "test2", "Yajuuuuuuuu"],
  //   });
  // };

  const hideHelpTextHandler = () => {
    setHelpText(false);
  };

  // const hideIdeasExampleHandler = () => {
  //   setIdeasExample(false);
  // };

  const selectChallangeHandler = (challangeId) => {
    setSelectedChallangeId(challangeId);
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center sm:text-5xl">Select a Challenge<span className="text-blue-600">.</span></h1>
      <p className="text-2xl mt-7 text-gray-300 hover:text-black transition duration-300 capitalize">
        {projectData.getProjectById.name} Project
      </p>
      <div className="flex justify-center">
          <div className="pr-8 sm:pr-10">
            <div className="flex items-center mt-6 text-lg text-blue-600 transition ease-in-out delay-15 hover:-translate-x-1 duration-300">
              <BsArrowLeftShort className="text-3xl" />
              <Link href={`/opportunity_question?project=${project}`} passHref>
                <a className="text-xl">Prev</a>
              </Link>
            </div>
          </div>
          <div className="pl-8 sm:pl-10">
            <div className="flex items-center mt-6 text-lg text-blue-600 transition ease-in-out delay-15 hover:translate-x-1 duration-300">
              <Link href={selectedChallangeId?`/opportunity_question/create?project=${project}&challenge=${selectedChallangeId}`: '/projects_actions'} passHref>
                <a className="text-xl">Next</a>
              </Link>
              <BsArrowRightShort className="text-3xl" />
            </div>
          </div>
        </div>
      <div className="w-full">   
        <SelectChallangeList
          onSelectChallanges={selectChallangeHandler}
          challenges={selectedChallenges}
        />
      </div>
    </section>
  );
};

export default SelectChallange;
