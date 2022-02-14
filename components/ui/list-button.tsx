import React from 'react';

const ListButton: React.FC<{
    type: 'submit' | 'reset' | 'button';
    id:number;
    onRemoveHandler: (id:number ) => void| undefined;
  }>  = ({onRemoveHandler, type, id, children}) => {

    const onRemoveHandlerButton =()=>{
        onRemoveHandler(id)
    }
  return (
    <button
  
      type={type || 'button'}
      onClick={onRemoveHandlerButton}
    >
      {children}
    </button>
  );
};

export default ListButton;