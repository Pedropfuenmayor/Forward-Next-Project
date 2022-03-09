import { ChallengeType, IdeaType} from "../../models/models";
import ListButton from "../ui/list-button";
import { BsX } from "react-icons/bs";

const ChallengesList: React.FC<{
  list: ChallengeType[]| IdeaType [];
  onOpen: (id:number) => void | undefined;
}> = ({list, onOpen}) => {
  const removeChallengeHandler = (id:number) => {
    onOpen(id);
  };

  return (
    <ul className="list-none w-10/12 mx-auto mb-8 p-0 max-w-12/12 sm:w-7/12">
      {list.map(({id, name}) => (
        <li
          className="my-4 mx-0 bg-gray-100 rounded p-1 shadow hover:shadow-md transition duration-300 sm:p-2"
          key={id}
        >
          <div className="flex justify-between">
            <div className="pl-4 text-sm sm:text-base">{name}</div>
            <div className="my-0 mx-4 flex items-center text-lg text-gray-300 hover:text-red-600 cursor-pointer transition duration-300 sm:text-xl">
              <ListButton
                onRemoveHandler={removeChallengeHandler}
                type="button"
                id={id as number}
              >
                <BsX />
              </ListButton>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChallengesList;