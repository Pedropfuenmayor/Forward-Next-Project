import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { BsCheck } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_ACTION_BY_IDEA_ID } from "../../graphql/querys";
import { getActionByIdeaId, getActionByIdeaIdVars } from "../../models/models";

const AlreadyHaveAction: React.FC<{
  ideaId: number;
}> = ({ ideaId }) => {
  const {
    loading: loadingAction,
    data: actionData,
    error,
  } = useQuery<getActionByIdeaId, getActionByIdeaIdVars>(
    GET_ACTION_BY_IDEA_ID,
    {
      variables: {
        ideaId: +ideaId,
      },
      fetchPolicy: "network-only",
    }
  );

  if (loadingAction) return null;

  const isAction = actionData.getActionByIdeaId ? true : false;

  return (
    <>
      {isAction && (
        <Tippy
          arrow={false}
          content="Already have an action"
          className="bg-gray-500 text-white rounded px-2 py-0.5"
        >
          <div className="text-1xl text-green-600">
            <BsCheck />
          </div>
        </Tippy>
      )}
    </>
  );
};

export default AlreadyHaveAction;
