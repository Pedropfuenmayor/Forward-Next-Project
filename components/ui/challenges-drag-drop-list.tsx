import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  ChallengeInputType,
  ChallengeType,
  IdeaType,
  updateChallenges,
  updateChallengesVars,
} from "../../models/models";
import { client } from "../../lib/apollo";
import {
  GET_CHALLENGES_BY_PROJECT,
  UPDATE_CHALLENGES_INDEXES,
} from "../../graphql/querys";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import ListItem from "./drag-list-item";

const ChallengesDragAndDropList: React.FC<{
  challenges: ChallengeType[];
  onOpen: (id: number) => void | undefined;
}> = ({ challenges, onOpen }) => {
  const removeChallengeHandler = (id: number) => {
    onOpen(id);
  };
  const router = useRouter();
  const { projectId } = router.query;

  const [updateChallenges] = useMutation<
    updateChallenges,
    updateChallengesVars
  >(UPDATE_CHALLENGES_INDEXES);

  const onTesting = (srcI, desI) => {
    const arr = [...challenges];
    const [reorderedItem] = arr.splice(srcI, 1);
    arr.splice(desI, 0, reorderedItem);

    const newChallenges = arr.map((challenge, index) => {
      return {
        ...challenge,
        index,
      };
    })

    client.writeQuery({
      query: GET_CHALLENGES_BY_PROJECT,
      data: {
        getChallengesByProject: newChallenges,
      },
      variables: {
        projectId: +projectId,
      },
    });

    const mutartionArray = newChallenges.map(
      ({ id, project_id, name, index, challenge_type, is_selected }) => ({
        id,
        project_id,
        name,
        index,
        challenge_type,
        is_selected,
      })
    );

    updateChallenges({
      variables: {
        challenges: mutartionArray as [ChallengeInputType],
      },
    })
      .then((res) => console.log(res))
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
      <ul className="list-none w-10/12 my-8 mx-auto p-0 max-w-12/12 sm:w-7/12">
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {challenges.map(({id, name}, i) => (
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

export default ChallengesDragAndDropList;
