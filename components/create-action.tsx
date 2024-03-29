import { useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  createAction,
  createActionVars,
  getIdeasByChallenge,
  getIdeasByChallengeVars,
  updateActionVars,
  updateAction,
  getActionByIdeaId,
  getActionByIdeaIdVars,
} from "../models/models";
import Button from "./ui/button";
import useInput from "../hooks/useInput";
import { useEffect } from "react";
import { uid } from "../helper/functions";
import { useMutation, useQuery } from "@apollo/client";
import validator from "validator";
import {
  CREATE_ACTION,
  GET_ACTION_BY_IDEA_ID,
  GET_IDEAS_BY_CHALLENGE_ID,
  UPDATE_ACTION,
} from "../graphql/querys";
import { useSession } from "next-auth/react";

const textValidation = (text) => {
  if (text.trim().length === 0) {
    return false;
  } else {
    return true;
  }
};

const dateValidation = (date) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const inputDate = new Date(date).setHours(0, 0, 0, 0);
  if (inputDate < today || validator.isEmpty(String(date))) {
    return false;
  } else {
    return true;
  }
};

const CreateAction: React.FC<{}> = () => {
  const { data: session, status } = useSession();
  const { id: userId } = session;
  const router = useRouter();
  const { project , challenge, idea } = router.query;
  const taskInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const succesCriteriaInputRef = useRef<HTMLInputElement>(null);
  const {
    error: taskError,
    onBlurvalidation: onBlurvalidationTask,
    onFocus: onFocusTask,
    fieldClasses: taskFieldClasses,
    submisionTextDateValidation: submisionTaskValidation,
  } = useInput(textValidation);

  const {
    error: dateError,
    onBlurvalidation: onBlurvalidationDate,
    onFocus: onFocusDate,
    fieldClasses: dateFieldClasses,
    submisionTextDateValidation: submisionDateValidation,
  } = useInput(dateValidation);

  const {
    error: SuccesCriteriaError,
    onBlurvalidation: onBlurValidationSuccesCriteria,
    onFocus: onFocusSuccesCriteria,
    fieldClasses: SuccesCriteriaFieldClasses,
    submisionTextDateValidation: submisionSuccesCriteriaValidation,
  } = useInput(textValidation);

  const { loading: loadingIdeas, error:ideasError, data: ideasData } = useQuery<
    getIdeasByChallenge,
    getIdeasByChallengeVars
  >(GET_IDEAS_BY_CHALLENGE_ID, {
    variables: {
      challengeId: +challenge,
    },
  });

  const { loading: loadingAction, error: actionError, data: actionData } = useQuery<
    getActionByIdeaId,
    getActionByIdeaIdVars
  >(GET_ACTION_BY_IDEA_ID, {
    variables: {
      ideaId: +idea,
    },
  });

  const [
    createAction,
    { loading: loadingCreatedAction, reset, error: createError },
  ] = useMutation<createAction, createActionVars>(CREATE_ACTION, {
    update(cache, { data }) {
      const { createAction } = data;
      cache.writeQuery({
        query: GET_ACTION_BY_IDEA_ID,
        data: {
          getActionByIdeaId: createAction,
        },
        variables: {
          ideaId: +idea,
        },
      });
    },
  });

  const [
    updateAction,
    { loading: loadingUpdateAction, reset: resetUpdate, error: updateError },
  ] = useMutation<updateAction, updateActionVars>(UPDATE_ACTION);

  useEffect(() => {
    if (actionData.getActionByIdeaId) {
      const { what, due_date, succes_criteria } = actionData.getActionByIdeaId;
      taskInputRef.current.value = what;
      dateInputRef.current.value = due_date as string;
      succesCriteriaInputRef.current.value = succes_criteria;
    }
  }, [actionData]);

  if (loadingIdeas || loadingAction)
    return <p className="text-center">Loading...</p>;
    if (ideasError)
    return <p className="text-center">`Error❗️${ideasError.message}`</p>;
  if (actionError)
    return <p className="text-center">`Error❗️${actionError.message}`</p>;
    if (createError)
    return <p className="text-center">`Error❗️${createError.message}`</p>;
  if (updateError)
    return <p className="text-center">`Error❗️${updateError.message}`</p>;


  const selectedIdea = ideasData.getIdeasByChallenge.find(
    (selectIdea) => selectIdea.id === +idea
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const what = taskInputRef.current.value;
    const dueDate = dateInputRef.current.value;
    const succesCriteria = succesCriteriaInputRef.current.value;

    submisionTaskValidation(what);
    submisionDateValidation(dueDate);
    submisionSuccesCriteriaValidation(succesCriteria);

    if (
      !textValidation(what) ||
      !dateValidation(dueDate) ||
      !textValidation(succesCriteria)
    ) {
      return;
    }

    const id = uid();

    if (!actionData.getActionByIdeaId) {
      createAction({
        variables: {
          createActionId: id,
          ideaId: +idea,
          userId: +userId,
          what,
          succesCriteria,
          dueDate,
        },
        optimisticResponse: {
          createAction: {
            id: "temp-id",
            idea_id: +idea,
            user_id: +userId,
            what,
            succes_criteria: succesCriteria,
            due_date: dueDate,
            __typename: "Action",
          },
        },
      })
        .then((res) => res)
        .catch((err) => console.log(err));
      router.push(
        `/actions/created?project=${project}&challenge=${challenge}&idea=${idea}&action=${id}`
      );
    } else {
      updateAction({
        variables: {
          updateActionId: +actionData.getActionByIdeaId.id,
          what,
          succesCriteria,
          dueDate,
        },
        optimisticResponse: {
          updateAction: {
            id: +actionData.getActionByIdeaId.id,
            what,
            succes_criteria: succesCriteria,
            due_date: dueDate,
            idea_id: +idea,
            user_id: +userId,
            __typename: "Action",
          },
        },
      })
        .then((res) => res)
        .catch((err) => console.log(err.networkError.result.errors));
      router.push(
        `/actions/created?project=${project}&challenge=${challenge}&idea=${idea}&action=${actionData.getActionByIdeaId.id}`
      );
    }
  };

  return (
    <section className="flex mb-10 flex-col justify-center items-center">
      <h1 className="text-4xl text-center sm:text-5xl">
        Action <span className="text-blue-600">Creation</span>.
      </h1>
      <p className="text-2xl mt-4 text-center w-11/12 text-gray-300 hover:text-black transition duration-300 capitalize">
        {selectedIdea.name}
      </p>
      
      <form onSubmit={submitHandler} className="max-w-full w-10/12 mx-auto sm:w-6/12">
        <div className="flex justify-between">
          <label className="block font-bold mb-2" htmlFor="text">
            Action
          </label>
          {taskError && <p className="text-red-500">Please enter a action</p>}
        </div>
        <input
          className={taskFieldClasses}
          type="text"
          id="text"
          onFocus={onFocusTask}
          onBlur={onBlurvalidationTask}
          ref={taskInputRef}
        />
        <div className="flex justify-between mt-10">
          <label className="block font-bold mb-2" htmlFor="date">
            Due Date
          </label>
          {dateError && (
            <p className="text-red-500">Please enter a valid date</p>
          )}
        </div>
        <input
          className={dateFieldClasses}
          type="date"
          id="date"
          onFocus={onFocusDate}
          onBlur={onBlurvalidationDate}
          ref={dateInputRef}
        />
        <div className="flex justify-between mt-10">
          <label className="block font-bold mb-2" htmlFor="criteria">
           Success Criteria
          </label>
          {SuccesCriteriaError && (
            <p className="text-red-500">Please enter a succes criteria</p>
          )}
        </div>
        <input
          className={SuccesCriteriaFieldClasses}
          type="text"
          id="criteria"
          onFocus={onFocusSuccesCriteria}
          onBlur={onBlurValidationSuccesCriteria}
          ref={succesCriteriaInputRef}
        />
        <div className="mt-8">
          <Button type="submit" onClick={undefined}>
            Create Action
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateAction;
