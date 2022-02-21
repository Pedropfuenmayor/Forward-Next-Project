import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { BsCheck } from "react-icons/bs";
import { useRouter } from "next/router";


const AlreadyHaveAction: React.FC<{
}> = () => {
  const router = useRouter();
  const { projectId, challangeId, ideaId} = router.query;


  const isAction = true

  return (
      <>
    {isAction && <Tippy
      arrow={false}
      content="Already have action"
      className="bg-gray-500 text-white rounded px-2 py-0.5"
    >
      <div className="text-1xl text-green-600">
        <BsCheck />
      </div>
    </Tippy>}
    </>
  );
};

export default AlreadyHaveAction;