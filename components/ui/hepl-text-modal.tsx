import React, {Fragment} from "react";
import Button from "./button";


// import { createPortal } from "react-dom";

//refactor logic, need to change the title property
const HelpTextModal: React.FC<{
  title: string;
  text: string;
  onConfirm: () => void;
}> = (props) => {
  return (
    <Fragment>
      <div className='fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-80' onClick={props.onConfirm} />
      <div className='fixed top-2/4 bg-white -mt-52 z-50 w-10/12 rounded-xl md:w-6/12 md:left-1/4'>
          <h2 className='pt-4 text-center'>
            {props.title} <span className='text-blue-600'>Help Text</span>
          </h2>
        <div className='mt-4 mx-12 max-w-10/12 text-center text-base max-h-72'>
          <p>{props.text}</p>
        </div>
        <div className='p-4 flex justify-center'>
          <Button type="button" onClick={props.onConfirm}>
            Okay
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

// const ErrorModal: React.FC<{
//     title:string;
//     message:string;
//     onConfirm: ()=> void;
// }> = (props)=>{
//     return createPortal(
//         <ModalOverlay
//         title={props.title}
//         message={props.message}
//         onConfirm={props.onConfirm}
//         />,
//         document.getElementById('portal') as HTMLElement
//     );
// };

export default HelpTextModal;