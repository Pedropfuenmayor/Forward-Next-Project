import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ChallengeType } from "../../models/models";
import { client } from "../../lib/apollo";
import { GET_CHALLENGES_BY_PROJECT } from "../../graphql/querys";
import { useRouter } from "next/router";

import ListItem from "./drag-list-item";

const DragAndDropList: React.FC<{
  challenges: ChallengeType[];
  onOpen: (id: number) => void | undefined;
}> = ({ challenges, onOpen }) => {
  const removeChallengeHandler = (id: number) => {
    onOpen(id);
  };
  const router = useRouter();
  const { projectId } = router.query;


  const onTesting = (srcI, desI) => {
    const arr = [...challenges];
    arr.splice(desI, 0, arr.splice(srcI, 1)[0]);

    client.writeQuery({
      query: GET_CHALLENGES_BY_PROJECT,
      data: {
        getChallengesByProject: [...arr],
      },
      variables: {
        projectId: +projectId,
      },
    });
   
  };

  return (
    <DragDropContext
      onDragEnd={(param) => {
        const srcI = param.source.index;
        const desI = param.destination?.index;
        if (desI) {
          onTesting(srcI, desI);
        }
      }}
    >
      <ul className="list-none w-7/12 my-8 mx-auto p-0 max-w-12/12">
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {challenges.map(({ id, name }, i) => (
                <Draggable key={id} draggableId={`draggable-${id}`} index={i}>
                  {(provided, snapshot) => {
                       if (snapshot.isDragging) {
                        const y = provided.draggableProps.style.top - 40
                        provided.draggableProps.style.top = y ;
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

export default DragAndDropList;
