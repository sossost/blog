import { useRef } from "react";
import classes from "./login-form.module.css";

const createUser = async (email, password, username) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
    header: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};

const SignupForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();
  const usernameInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;

    try {
      const result = await createUser(
        enteredEmail,
        enteredPassword,
        enteredUsername
      );

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.login_page}>
      <div className={classes.login_form}>
        <form>
          <input
            type="text"
            placeholder="이메일"
            ref={emailInputRef}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            ref={passwordInputRef}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            ref={passwordConfirmInputRef}
            required
          />
          <input
            type="text"
            placeholder="닉네임"
            ref={usernameInputRef}
            required
          />
          <button onClick={submitHandler}>회원가입</button>
          <div>
            <span>아이디/비밀번호 찾기</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
