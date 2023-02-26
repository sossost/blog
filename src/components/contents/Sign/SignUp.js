import { useState } from "react";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const [enteredId, setEnteredId] = useState("");
  const [entredIdTouched, setEnteredIdTouched] = useState(false);
  const [idIsEmpty, setIdIsEmpty] = useState(true);

  const [enteredPw, setEnteredPw] = useState("");
  const [enteredPwConfirm, setEnteredPwConfirm] = useState("");
  const [enteredPwConfirmTouched, setEnteredPwConfirmTouched] = useState(false);
  const [pwIsSame, setPwIsSame] = useState(true);

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredUsernameTouched, setEnteredUsernameTouched] = useState(false);
  const [usernameIsEmpty, setUsernameIsEmpty] = useState(true);

  const [pwIsValid, setPwIsValid] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);

  const idChangeHandler = (event) => {
    setEnteredId(event.target.value);
    if (event.target.value.trim() !== "") {
      setIdIsEmpty(false);
    }
  };

  const idInputBlurHandler = () => {
    setEnteredIdTouched(true);
    if (enteredId.trim() === "") {
      setIdIsEmpty(true);
      return;
    } else {
      setIdIsEmpty(false);
    }
  };

  const pwChangeHandler = (event) => {
    setEnteredPw(event.target.value);
  };

  const pwConfirmChangeHandler = (event) => {
    setEnteredPwConfirm(event.target.value);
    if (event.target.value !== enteredPw) {
      setPwIsSame(false);
    } else {
      setPwIsSame(true);
    }
  };

  const pwConfirmInputBlurHandler = () => {
    setEnteredPwConfirmTouched(true);
  };

  const userNameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
    if (event.target.value.trim() !== "") {
      setUsernameIsEmpty(false);
    }
  };

  const usernameInputBlurHandler = () => {
    setEnteredUsernameTouched(true);
    if (enteredUsername.trim() === "") {
      setUsernameIsEmpty(true);
      return;
    } else {
      setUsernameIsEmpty(false);
    }
  };

  const signSubmitHandler = (event) => {
    event.preventDefault();
    if (idIsValid && pwIsValid && usernameIsValid) {
      const userData = [];
      userData.push({
        id: enteredId,
        password: enteredPw,
        username: enteredUsername,
        date: new Date(),
      });
      console.log(userData);
    }
  };

  return (
    <div className={classes.signup}>
      <form>
        <span className={classes.title}>회원가입</span>
        <div className={classes.input}>
          <label>아이디</label>
          <input
            type="text"
            onChange={idChangeHandler}
            onBlur={idInputBlurHandler}
          />
        </div>
        {entredIdTouched && idIsEmpty ? <p>아이디를 입력해주세요.</p> : ""}
        <div className={classes.input}>
          <label>비밀번호</label>
          <input type="password" onChange={pwChangeHandler} />
        </div>
        <div className={classes.input}>
          <label>비밀번호 확인</label>
          <input
            type="password"
            onChange={pwConfirmChangeHandler}
            onBlur={pwConfirmInputBlurHandler}
          />
        </div>
        {enteredPwConfirmTouched && !pwIsSame ? (
          <p>비밀번호가 일치하지 않습니다..</p>
        ) : (
          ""
        )}
        <div className={classes.input}>
          <label>닉네임</label>
          <input
            type="text"
            onChange={userNameChangeHandler}
            onBlur={usernameInputBlurHandler}
          />
        </div>
        {enteredUsernameTouched && usernameIsEmpty ? (
          <p>닉네임을 입력해주세요.</p>
        ) : (
          ""
        )}
        <button className={classes.btn} onClick={signSubmitHandler}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
