/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiMenu } from "react-icons/bi";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  getIdeasByChallenge,
  getIdeasByChallengeVars,
  IdeaType,
  updateIdea,
  updateIdeaVars,
} from "../../models/models";
import {
  GET_IDEAS_BY_CHALLENGE_ID,
  UPDATE_IDEA_BY_ID,
} from "../../graphql/querys";
import { client } from "../../lib/apollo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DropdownImpactEffort: React.FC<{
  ideaId: number | string;
  type: string;
}> = ({ ideaId, type }) => {
  const router = useRouter();
  const { challenge } = router.query;

  const { loading: loadingIdeas, data: ideasData } = useQuery<
    getIdeasByChallenge,
    getIdeasByChallengeVars
  >(GET_IDEAS_BY_CHALLENGE_ID, {
    variables: {
      challengeId: +challenge,
    },
  });

  const [
    updateIdea,
    {
      loading: loadingdeleteChallenge,
      reset: resetDeleteChallenge,
      error: deleteError,
    },
  ] = useMutation<updateIdea, updateIdeaVars>(UPDATE_IDEA_BY_ID);

  const impactEffortUpdateFunction = (event) => {
    if (event.target.innerHTML.includes("High")) {
      return true;
    } else if (event.target.innerHTML.includes("Low")) {
      return false;
    } else {
      return null;
    }
  };

  const impactEffortLevelHandler = (event) => {
    const updatedIdea: IdeaType = ideasData.getIdeasByChallenge.find((idea) => {
      return idea.id === ideaId;
    });
    const {
      id,
      name,
      index,
      challenge_id,
      effort,
      impact,
      is_selected,
      __typename,
    } = updatedIdea;
    updateIdea({
      variables: {
        updateIdeaId: +id,
        index,
        name,
        isSelected: is_selected,
        effort: type === "effort" ? impactEffortUpdateFunction(event) : effort,
        impact: type === "impact" ? impactEffortUpdateFunction(event) : impact,
      },
      optimisticResponse: {
        updateIdea: {
          id,
          index,
          name,
          challenge_id,
          is_selected,
          effort:
            type === "effort" ? impactEffortUpdateFunction(event) : effort,
          impact:
            type === "impact" ? impactEffortUpdateFunction(event) : impact,
          __typename,
        },
      },
    })
      .then((re) => re)
      .catch((err) => console.log(err.networkError.result.errors));
  };

  //   const impactLevelNoneHandler = (event) => {
  // //update none
  //   };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center">
        <Menu.Button>
          <BiMenu />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute bg-white z-10 right-0 mt-2 w-32 rounded-md shadow-lg bg- ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item
              as="button"
              onClick={impactEffortLevelHandler}
              className="w-full text-left"
            >
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  High {type}
                </a>
              )}
            </Menu.Item>
            <Menu.Item
              as="button"
              onClick={impactEffortLevelHandler}
              className="w-full text-left"
            >
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Low {type}
                </a>
              )}
            </Menu.Item>
            <Menu.Item
              as="button"
              onClick={impactEffortLevelHandler}
              className="w-full text-left"
            >
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  None
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownImpactEffort;
