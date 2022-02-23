import { useState } from "react";
import { DELETE_ACTION, GET_ACTIONS_BY_USER_ID } from "../../graphql/querys";
import DeleteModal from "./delete-modal";
import {
  deleteAction,
  deleteActionVars,
  getActionsByUserId,
  getActionsByUserIdVars,
  ProjectType,
} from "../../models/models";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

const TaskPanel: React.FC<{
  id: number;
  projects: [ProjectType];
}> = ({ id, projects }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState<true | false>(false);
  const { data: session, status } = useSession();
  const { id: userId } = session;

  const { loading: loadingAction, data: actionData } = useQuery<
    getActionsByUserId,
    getActionsByUserIdVars
  >(GET_ACTIONS_BY_USER_ID, {
    variables: {
      userId: +userId,
    },
  });

  const [
    deleteActionFunction,
    { loading: loadingDeletedOQ, reset: resetDeleteddOQ, error: deletedError },
  ] = useMutation<deleteAction, deleteActionVars>(DELETE_ACTION, {
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_ACTIONS_BY_USER_ID,
        data: {
          getActionsByUserId: actionData.getActionsByUserId.filter((action) => {
            return action.id !== id;
          }),
        },
        variables: {
          userId: +userId,
        },
      });
    },
  });

  if (loadingAction) return null;

  const action = actionData.getActionsByUserId.find((action) => {
    return action.id === id;
  });

  const ideaId = action.idea_id;

  const project = projects.find((project) => {
    return project.challenges.some((challenge) => {
      return challenge.ideas.some((idea) => {
        return idea.id === ideaId;
      });
    });
  });

  const challenge = project.challenges.find((challenge) => {
    return challenge.ideas.some((idea) => {
      return idea.id === ideaId;
    });
  });

  const idea = challenge.ideas.find((idea) => {
    return idea.id === ideaId;
  });

  const opendModal = () => {
    setIsOpen(true);
    setDeleteAction(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDeleteAction(false);
  };

  const removeChallangeHandler = () => {
    if (deleteAction) {
      deleteActionFunction({
        variables: {
          deleteActionId: id,
        },
      });
    } else {
      return;
    }
  };

  return (
    <div className="bg-gray-100 p-3 rounded-lg">
      <div className="text-black mt-1">
        <h3 className="inline-block font-bold">Project Name:</h3>{" "}
        <p className="inline-block">{project.name}</p>
      </div>
      <div className="text-black mt-1">
        <h3 className="inline-block font-bold">Oportunity question:</h3>{" "}
        <p className="inline-block">
          {challenge.opportunity_question
            ? challenge.opportunity_question.name
            : "N/A"}
        </p>
      </div>
      <div className="text-black mt-1">
        <h3 className="inline-block font-bold">Idea:</h3>{" "}
        <p className="inline-block">{idea.name}</p>
      </div>
      <div className="text-black  mt-1">
        <h3 className="inline-block font-bold">Due date:</h3>{" "}
        <p className="inline-block">{action.due_date}</p>
      </div>
      <div className="text-black  mt-1">
        <h3 className="inline-block font-bold">Succes Criteria:</h3>{" "}
        <p className="inline-block">{action.succes_criteria}</p>
      </div>
      <div className="mt-4 text-right">
        <DeleteModal
          onClose={closeModal}
          onRemove={removeChallangeHandler}
          isOpen={isOpen}
        />
        <button
          onClick={opendModal}
          type="button"
          className="inline-flex justify-center px-2 py-0.5 text-sm text-red-500 bg-gray-300 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskPanel;
