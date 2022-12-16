import { useReducer } from "react";

// useReducer로 여러개의 state관리하기

const initialState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  } else if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  } else if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return initialState;
};

const useInput = (validateValue) => {
  const [inputReducer, dispatch] = useReducer(inputStateReducer, initialState);

  const valueIsValid = validateValue(inputReducer.value); // 유효성 검사
  const hasError = !valueIsValid && inputReducer.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputReducer.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
