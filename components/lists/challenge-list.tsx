import { ChallengeType} from "../../models/models";
import ListButton from "../ui/list-button";
import { BsX } from "react-icons/bs";

const ChallengesList: React.FC<{
  list: ChallengeType[];
  onOpen: (id:number) => void | undefined;
}> = ({list, onOpen}) => {
  const removeChallengeHandler = (id:number) => {
    onOpen(id);
  };

  return (
    <ul className="list-none w-7/12 my-8 mx-auto p-0 max-w-12/12">
      {list.map((challenge: ChallengeType) => (
        <li
          className="my-4 mx-0 bg-gray-100 rounded p-3 shadow hover:shadow-md transition duration-300"
          key={challenge.id}
        >
          <div className="flex justify-between">
            <div className="pl-4">{challenge.name}</div>
            <div className="my-0 mx-4 flex items-center text-2xl text-gray-300 hover:text-red-600 cursor-pointer transition duration-300">
              <ListButton
                onRemoveHandler={removeChallengeHandler}
                type="button"
                id={challenge.id as number}
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