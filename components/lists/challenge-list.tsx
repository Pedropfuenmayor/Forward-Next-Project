import { ChallengeType} from "../../models/models";
import ListButton from "../ui/list-button";
import { BsX } from "react-icons/bs";

const ChallengesList: React.FC<{
  list: ChallengeType[];
  onOpen: (challangeId: string, projectId: string, challangeType:string) => void | undefined;
}> = ({list, onOpen}) => {
  const removeChallengeHandler = (projectId, challangeId,challangeType:string ) => {
    onOpen(challangeId, projectId, challangeType);
  };

  return (
    <ul className="list-none w-7/12 my-8 mx-auto p-0 max-w-12/12">
      {list.map((item: ChallengeType) => (
        <li
          className="my-4 mx-0 bg-gray-100 rounded p-3 shadow hover:shadow-md transition duration-300"
          key={item.id}
        >
          <div className="flex justify-between">
            <div className="pl-4">{item.name}</div>
            <div className="my-0 mx-4 flex items-center text-2xl text-gray-300 hover:text-red-600 cursor-pointer transition duration-300">
              {/* <ListButton
                onRemoveHandler={removeChallengeHandler}
                type="button"
                projectId={item.projectId}
                challangeId={item.challangeId}
                challangeType={item.type}
                ideaId={null}
                actionId={null}
              >
                <BsX />
              </ListButton> */}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChallengesList;