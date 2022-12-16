import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== ""); // wow!!

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;
  if (nameIsValid && emailIsValid) formIsValid = true;

  const submitHandler = (event) => {
    event.preventDefault();

    if (!nameIsValid || !emailIsValid) return;

    nameReset();
    emailReset();
  };

  const nameClassesValue = nameHasError
    ? "form-control invalid"
    : "form-control";

  const emailClassesValue = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameClassesValue}>
        <label htmlFor="name">Your Name</label>
        <input
          value={nameValue}
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
        />
      </div>
      {nameHasError && <p className="error-text">name 공백입니다!!</p>}
      <div className={emailClassesValue}>
        <label htmlFor="email">E-mail</label>
        <input
          value={emailValue}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
        />
      </div>
      {emailHasError && <p className="error-text">@이 포함되어야합니다!!</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
