import React from 'react';

const Button: React.FC<{
    type: 'submit' | 'reset' | 'button';
    onClick: () => void| undefined;
  }>  = (props) => {
  return (
    <button
      className='bg-blue-600 rounded text-white py-2 px-6 hover:bg-blue-700 '
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;