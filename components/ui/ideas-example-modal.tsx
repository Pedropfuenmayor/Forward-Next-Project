import React, {Fragment} from "react";
import ExampleList from '../lists/example-list';
import Button from "./button"


// import { createPortal } from "react-dom";

//refactor logic, need to change the title property
const IdeasExampleModal: React.FC<{
  sampleProjectName: string;
  type: string;
  examples: string[];
  onConfirm: () => void;
}> = (props) => {
  return (
    <Fragment>
      <div
        className="fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-80"
        onClick={props.onConfirm}
      />
      <div className="fixed left-1/4 top-2/4  bg-white -mt-52 z-50 max-w-full w-6/12 rounded-xl">
        <h2 className="p-6 text-center">
          <span className='text-blue-600'>Sample Project Name:</span> {props.sampleProjectName}
        </h2>
        <h3 className='text-center'>{props.type}</h3>
        <ExampleList list={props.examples} />
        <div className='pt-0 pb-4 flex justify-center'>
          <Button type="button" onClick={props.onConfirm}>
            Okay
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default IdeasExampleModal