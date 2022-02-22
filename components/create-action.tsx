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
  const router = useRouter();
  const { projectId, challengeId, ideaId } = router.query;
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

  const { loading: loadingIdeas, data: ideasData } = useQuery<
    getIdeasByChallenge,
    getIdeasByChallengeVars
  >(GET_IDEAS_BY_CHALLENGE_ID, {
    variables: {
      challengeId: +challengeId,
    },
  });

  const { loading: loadingAction, data: actionData } = useQuery<
    getActionByIdeaId,
    getActionByIdeaIdVars
  >(GET_ACTION_BY_IDEA_ID, {
    variables: {
      ideaId: +ideaId,
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
          ideaId: +ideaId,
        },
      });
    },
  });

  const [
    updateAction,
    { loading: loadingUpdateAction, reset: resetUpdate, error: updateError },
  ] = useMutation<updateAction, updateActionVars>(UPDATE_ACTION);


  if (loadingIdeas || loadingAction)
    return <p className="text-center">Loading...</p>;

    useEffect(() => {
          if (actionData.getActionByIdeaId) {
            const { what, due_date, succes_criteria } =
              actionData.getActionByIdeaId;
            taskInputRef.current.value = what;
            dateInputRef.current.value = due_date as string;
            succesCriteriaInputRef.current.value = succes_criteria;
          }
      }, [actionData]);

  const idea = ideasData.getIdeasByChallenge.find(
    (idea) => idea.id === +ideaId
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
          ideaId: +ideaId,
          what,
          succesCriteria,
          dueDate,
        },
        optimisticResponse: {
          createAction: {
            id: "temp-id",
            idea_id: ideaId as string,
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
        `/${projectId}/opportunity_question/${challengeId}/actions/created/${ideaId}/${id}`
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
            idea_id: ideaId as string,
            __typename: "Action",
          },
        },
      })
        .then((res) => res)
        .catch((err) => console.log(err.networkError.result.errors));
      router.push(
        `/${projectId}/opportunity_question/${challengeId}/actions/created/${ideaId}/${actionData.getActionByIdeaId.id}`
      );
    }
  };

  return (
    <section className="flex mb-10 flex-col justify-center items-center">
      <h1 className="text-4xl text-center">
        Action <span className="text-blue-600">Creation</span>
      </h1>
      <p className="text-2xl mt-4 text-gray-200 hover:text-black transition duration-300">
        {idea.name}
      </p>
      <div className=" text-gray-200 w-44 flex justify-between"></div>
      <form onSubmit={submitHandler} className="max-w-full w-5/12 mx-auto">
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
            When will be done?
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
            What is the succes criteria
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
