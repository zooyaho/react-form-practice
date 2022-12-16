import { useState } from "react";

function Practice() {
  const [nameValue, setNameValue] = useState("");
  // const [nameIsValid, setNameIsValid] = useState(false);
  const [touchedName, setTouchedName] = useState(false);
  // const [formIsValid, setFormIsValid] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [touchedEmail, setTouchedEmail] = useState(false);

  const emailIsValid = emailValue.includes("@");
  const emailIsInValid = !emailIsValid && touchedEmail;

  // const nameRef = useRef();
  // 컴포넌트가 리렌더링될 때마다 현재의 name value를 사용하여 유효성검사를 하면 되니까~~
  const nameInputIsValid = nameValue.trim() !== "";
  const nameInputIsInvalid = !nameInputIsValid && touchedName; // 유효하지 않은지 확인하는 변수
  console.log(
    "nameInputIsInvalid, emailIsInValid: ",
    nameInputIsInvalid,
    emailIsInValid
  );

  let formIsValid = false;
  if (nameInputIsValid && emailIsValid) formIsValid = true;

  // useEffect(() => {
  //   if (nameInputIsValid) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [nameInputIsValid]);

  const emailValueChangeHandler = (event) => {
    setEmailValue(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setTouchedEmail(true);
  };

  const nameValueChangeHandler = (event) => {
    setNameValue(event.target.value);
    // if (event.target.value.trim() !== "") {
    //   // state의 비동기적 처리로 인해 event의 value를 사용하여 유효성 검사를 한다.
    //   setNameIsValid(true);
    //   return;
    // }
  };

  const nameInputBlurHandler = (event) => {
    // form을 제출했을때가 아닌 focus를 잃었을때 유효성 검사를 하기 위한 이벤트 함수
    // 사용자에게 즉각적 피드백 제공
    setTouchedName(true);
    // if (nameValue.trim() === "") {
    //   setNameIsValid(false);
    //   return;
    // }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setTouchedName(true); // 사용자가 확인했으므로 true로 설정
    setTouchedEmail(true);

    if (!nameInputIsValid || !emailIsValid) {
      // setNameIsValid(false);
      return; // 서브밋 함수 실행을 중단함
    }
    // setNameIsValid(true);
    // const nameRefValue = nameRef.current.value;
    // console.log("ref: ", nameRefValue);
    // nameRef.current.value = ''; => JS로 DOM을 직접적으로 변경하는것이기 때문에 지양해야하는 방법이다.
    setNameValue(""); // 초기화
    setEmailValue("");
    setTouchedName(false); // 초기화
    setTouchedEmail(false);
  };

  const nameClassesValue = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailClassesValue = emailIsInValid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameClassesValue}>
        <label htmlFor="name">Your Name</label>
        <input
          value={nameValue}
          // ref={nameRef}
          type="text"
          id="name"
          onChange={nameValueChangeHandler}
          onBlur={nameInputBlurHandler}
        />
      </div>
      {nameInputIsInvalid && <p className="error-text">name 공백입니다!!</p>}
      <div className={emailClassesValue}>
        <label htmlFor="email">E-mail</label>
        <input
          value={emailValue}
          // ref={nameRef}
          type="email"
          id="email"
          onChange={emailValueChangeHandler}
          onBlur={emailInputBlurHandler}
        />
      </div>
      {emailIsInValid && <p className="error-text">@이 포함되어야합니다!!</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
}

export default Practice;
