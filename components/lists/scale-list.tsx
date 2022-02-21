import { IdeaType } from "../../models/models";
import "tippy.js/dist/tippy.css";
import DropdownAction from "../ui/dropdown-action";
import AlreadyHaveAction from "../ui/alreade-have-action";
const ScaleList: React.FC<{
  list: IdeaType[];
}> = ({ list }) => {
  return (
    <ul className="list-none w-10/12 my-8 mx-auto p-0 max-w-12/12">
      {list.map(({ name, id }) => {
        return (
          <li
            className="my-4 mx-0 bg-gray-100 rounded p-3 shadow hover:shadow-md transition duration-300"
            key={Math.random()}
          >
            <div className="flex justify-between items-center">
              <div className="pl-4">{name}</div>
              <div className="flex">
                <AlreadyHaveAction />
                <div className="my-0 mx-4 text-1xl text-gray-300 flex items-center hover:text-blue-600 cursor-pointer transition duration-300">
                  <DropdownAction ideaId={id as number} />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ScaleList;
