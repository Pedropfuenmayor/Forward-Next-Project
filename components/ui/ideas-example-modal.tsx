import React, { Fragment } from "react";
import ExampleList from "../lists/example-list";
import Button from "./button";

// import { createPortal } from "react-dom";

//refactor logic, need to change the title property
const IdeasExampleModal: React.FC<{
  sampleItem: string;
  ItemName: string;
  type: string;
  examples: string[];
  onConfirm: () => void;
}> = ({ onConfirm, sampleItem, type, examples, ItemName }) => {
  return (
    <Fragment>
      <div
        className="fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-80"
        onClick={onConfirm}
      />
      <div className="fixed top-2/4 bg-white -mt-52 z-50 w-10/12 rounded-xl md:w-6/12 md:left-1/4">
        <h2 className="p-6 text-center text-black">
          <span className="text-blue-600">{ItemName}:</span> {sampleItem}
        </h2>
        <h3 className="text-center">{type}</h3>
        <ExampleList list={examples} />
        <div className="pt-0 pb-4 flex justify-center">
          <Button type="button" onClick={onConfirm}>
            Okay
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default IdeasExampleModal;
