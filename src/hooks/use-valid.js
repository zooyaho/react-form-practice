import { useState } from "react";

const useValid = (validChecking) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredTouched, setEnteredTouched] = useState(false);

  const valueIsValid = validChecking(enteredValue);
  const hasError = !valueIsValid && enteredTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const valueBlurHandler = () => {
    setEnteredTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setEnteredTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useValid;
