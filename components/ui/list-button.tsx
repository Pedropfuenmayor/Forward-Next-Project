import React from 'react';

const ListButton: React.FC<{
    type: 'submit' | 'reset' | 'button';
    projectId:string;
    challangeId:string;
    challangeType:string|null;
    ideaId:string|null;
    actionId:string|null;
    
    
    onRemoveHandler: (projectId:string, challangeId:string,challageType:string,ideaId:string,actionId:string ) => void| undefined;
  }>  = (props) => {

    const onRemoveHandler =()=>{
        props.onRemoveHandler(props.projectId, props.challangeId, props.challangeType, props.ideaId, props.actionId  )
    }


  return (
    <button
  
      type={props.type || 'button'}
      onClick={onRemoveHandler}
    >
      {props.children}
    </button>
  );
};

export default ListButton;