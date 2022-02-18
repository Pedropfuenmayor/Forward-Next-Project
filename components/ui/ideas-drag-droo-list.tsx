import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
IdeaInputType,
  IdeaType,
  updateChallenges,
  updateChallengesVars,
  updateIdeas,
  updateIdeasVars,
} from "../../models/models";
import { client } from "../../lib/apollo";
import {
  GET_CHALLENGES_BY_PROJECT,
  GET_IDEAS_BY_CHALLENGE_ID,
  UPDATE_CHALLENGES_INDEXES,
  UPDATE_IDEAS_INDEXES,
} from "../../graphql/querys";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import ListItem from "./drag-list-item";

const IdeasDragAndDropList: React.FC<{
  ideas: IdeaType[];
  onOpen: (id: number) => void | undefined;
}> = ({ ideas, onOpen }) => {
  const removeChallengeHandler = (id: number) => {
    onOpen(id);
  };
  const router = useRouter();
  const { challengeId } = router.query;

  const [updateIdeas] = useMutation<
    updateIdeas,
    updateIdeasVars
  >(UPDATE_IDEAS_INDEXES);

  const onTesting = (srcI, desI) => {
    const arr = [...ideas];
    arr.splice(desI, 0, arr.splice(srcI, 1)[0]);

    client.writeQuery({
      query: GET_IDEAS_BY_CHALLENGE_ID,
      data: {
        getIdeasByChallenge: [...arr],
      },
      variables: {
        challengeId: +challengeId,
      },
    });

    const mutartionArray = arr.map(
      ({ id, challenge_id, name, index, is_selected, impact, effort}) => ({
        id,
        challenge_id,
        name,
        index,
        is_selected,
        impact,
        effort
      })
    );

    updateIdeas({
      variables: {
        ideas: mutartionArray as [IdeaInputType],
      },
    })
      .then((res) => res)
      .catch((error) => console.log(error.networkError.result.errors));
  };

  return (
    <DragDropContext
      onDragEnd={(param) => {
        const srcI = param.source.index;
        const desI = param.destination?.index;
        if (desI || desI === 0) {
          onTesting(srcI, desI);
        }
      }}
    >
      <ul className="list-none w-7/12 my-8 mx-auto p-0 max-w-12/12">
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {ideas.map(({id, name}, i) => (
                <Draggable key={id} draggableId={`draggable-${id}`} index={i}>
                  {(provided, snapshot) => {
                    if (snapshot.isDragging) {
                      const y = provided.draggableProps.style.top - 35;
                      provided.draggableProps.style.top = y;
                    }
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItem
                          name={name}
                          id={id}
                          onRemoveHandler={removeChallengeHandler}
                          index={i}
                        />
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ul>
    </DragDropContext>
  );
};

export default IdeasDragAndDropList;