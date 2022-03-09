import React from 'react';

const Button: React.FC<{
    type: 'submit' | 'reset' | 'button';
    onClick: () => void| undefined;
  }>  = (props) => {
  return (
    <button
      className='bg-blue-600 rounded text-sm text-white py-1 px-3 hover:bg-blue-700 sm:px-4'
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;