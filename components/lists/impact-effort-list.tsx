import { IdeaType } from "../../models/models";
import DropdownImpactEffort from "../ui/dropdown-impact-effort";

const ImpactEffortIdeaList: React.FC<{
  ideas: IdeaType[];
  type: string;
}> = ({ ideas, type }) => {

  return (
    <ul className="list-none w-7/12 my-8 mx-auto p-0 max-w-12/12">
      {ideas.map(({ id, name, impact, effort }, index) => {
        return (
          <li
            className="my-4 mx-0 bg-gray-100 rounded p-3 shadow hover:shadow-md transition duration-300"
            key={Math.random()}
          >
            <div className="flex justify-between items-center">
              <div className="pl-4">{name}</div>
              <div className="flex">
                <div
                  className={
                    (impact === true && type === "impact") ||
                    (effort === true && type === "effort")
                      ? "my-0 mx-4 text-1xl text-green-600 flex items-center hover:text-blue-600 cursor-pointer transition duration-300"
                      : "my-0 mx-4 text-1xl text-red-500 flex items-center hover:text-blue-600 cursor-pointer transition duration-300"
                  }
                >
                  {type === "impact"
                    ? `${
                        impact
                          ? "High Impact"
                          : impact === false
                          ? "Low Impact"
                          : ""
                      }`
                    : `${
                        effort
                          ? "High Effort"
                          : effort === false
                          ? "Low Effort"
                          : ""
                      }`}
                </div>
                <div className="my-0 mx-4 text-1xl text-gray-300 flex items-center hover:text-blue-600 cursor-pointer transition duration-300">
                  {index === 0 && (impact === null) ? (
                    <span className="pl-4 animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
                  ) : (
                    ""
                  )}
                  <DropdownImpactEffort ideaId={id} type={type} />
                </div>
                {/* <div className="my-0 mx-4 flex items-center text-2xl text-gray-300 hover:text-red-600 cursor-pointer transition duration-300">
                    <ListButton
                      onRemoveHandler={removeChallengeHandler}
                      type="button"
                      projectId={item.projectId}
                      challangeId={item.challangeId}
                      challangeType={null}
                      ideaId={item.ideaId}
                      actionId={null}
                    >
                      <BsX />
                    </ListButton>
                  </div> */}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ImpactEffortIdeaList;
