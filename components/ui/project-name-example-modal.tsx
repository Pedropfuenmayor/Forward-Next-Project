import React, {Fragment} from "react";
import ExampleList from "../lists/example-list"
import Button from "./button";


// import { createPortal } from "react-dom";


 //refactor logic, need to change the title property
const ProjectNameExampleModal: React.FC<{
  examples: string[];
  onConfirm: () => void;
}> = (props) => {

  return (
    <Fragment>
      <div className='fixed top-0 left-0 w-full h-full z-40 bg-black bg-opacity-80' onClick={props.onConfirm} />
        <div className='fixed top-2/4 bg-white -mt-52 z-50 w-10/12 rounded-xl md:w-6/12 md:left-1/4'>
           <h2 className="pt-6 text-center">Project Name{' '}<span>Examples</span></h2>
          <ExampleList list={props.examples}/>
          <footer className='pt-0 pb-4 flex justify-center'>
              <Button type='button' onClick={props.onConfirm}>
                  Okay
              </Button>
          </footer>
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

export default ProjectNameExampleModal;