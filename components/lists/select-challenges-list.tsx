import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { ChallengeType } from "../../models/models";

const SelectChallangeList: React.FC<{
  challenges: ChallengeType[];
  onSelectChallanges: (id: number | number) => void | undefined;
}> = ({ challenges, onSelectChallanges }) => {
  const [selected, setSelected] = useState<ChallengeType>(challenges[0]);

  useEffect(() => {
    if (selected) {
      const { id } = selected;
      onSelectChallanges(id as number);
    }
  }, [selected, onSelectChallanges]);

  return (
    <div className="w-full px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">
            Challange Selection
          </RadioGroup.Label>
          <div className="space-y-2">
            {challenges.map((challange) => (
              <RadioGroup.Option
                key={challange.id}
                value={challange}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-gray-400 text-white"
                      : "bg-gray-200"
                  }
                    relative rounded-lg shadow-md p-2 cursor-pointer flex focus:outline-none sm:px-5 sm:py-4`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {challange.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SelectChallangeList;
