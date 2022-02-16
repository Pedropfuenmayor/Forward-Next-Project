import { OQType } from "../../models/models";
import ListButton from "../ui/list-button";
import { BsX } from "react-icons/bs";
import { idArg } from "nexus";

const OpportunityList: React.FC<{
  opportunityQuestion: OQType;
  onOpen: (id) => void | undefined;
}> = ({ onOpen, opportunityQuestion }) => {
  const removeChallengeHandler = (id) => {
    onOpen(id);
  };

  return (
    <div className="list-none w-7/12 my-8 mx-auto p-0 max-w-12/12">
      <div className="my-4 mx-0 bg-gray-100 rounded p-3 shadow hover:shadow-md transition duration-300">
        <div className="flex justify-between">
          <div className="pl-4">{opportunityQuestion.name}</div>
          <div className="my-0 mx-4 flex items-center text-2xl text-gray-300 hover:text-red-600 cursor-pointer transition duration-300">
            <ListButton
              onRemoveHandler={removeChallengeHandler}
              type="button"
              id={opportunityQuestion.id as number}
            >
              <BsX />
            </ListButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityList;
