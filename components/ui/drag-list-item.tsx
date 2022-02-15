import { ChallengeType } from "../../models/models";
import ListButton from "./list-button";
import { BsX } from "react-icons/bs";

const ListItem: React.FC<{
  id: number | string;
  name: string;
  onRemoveHandler: (id: number) => void | undefined;
}> = ({name, id, onRemoveHandler}) => {
  return (
    <li
    className="my-4 mx-0 bg-gray-100 rounded p-3 shadow hover:shadow-md transition duration-300"
    key={id}
  >
    <div className="flex justify-between">
      <div className="pl-4">{name}</div>
      <div className="my-0 mx-4 flex items-center text-2xl text-gray-300 hover:text-red-600 cursor-pointer transition duration-300">
        <ListButton
          onRemoveHandler={onRemoveHandler}
          type="button"
          id={id as number}
        >
          <BsX />
        </ListButton>
      </div>
    </div>
  </li>
  );
};

export default ListItem;
