import { useState } from "react";

const useInput = (validationLogic) => {
  const [error, setError] = useState(false);

  const onBlurvalidation = (event) => {
    const enteredValue = event.target.value;
    if (!validationLogic(enteredValue)) {
      setError(true);
    }
  };

  const onBlurvalidationTest = (event, test) => {
    const enteredValue = event.target.value;
    if (!validationLogic(enteredValue, test)) {
      setError(true);
    }
  };

  const submisionTextDateValidation=(value)=>{
    if (!validationLogic(value)) {
        setError(true);
      }
  }

  const submisionTestValidation=(testDate,taskDate )=>{
    if (!validationLogic(taskDate, testDate)) {
        setError(true);
      }
  }



  const onFocus=()=>{
      setError(false)
  }

  const fieldClasses = error
    ? "block w-full text-base p-0.5 mb-2 rounded border-red-300 bg-red-100"
    : "block w-full text-base p-0.5 rounded bg-gray-200 mb-2";

  return {
    error,
    onBlurvalidation,
    onFocus,
    fieldClasses,
    onBlurvalidationTest,
    submisionTextDateValidation,
    submisionTestValidation

  };
};

export default useInput;