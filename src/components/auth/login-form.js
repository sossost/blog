import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import Router from "next/router";

import classes from "./login-form.module.css";

const LoginForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (result.error === "가입된 이메일이 아닙니다.") {
      setEmailIsInvalid(true);
      return;
    }

    if (result.error === "올바른 비밀번호가 아닙니다.") {
      setPasswordIsInvalid(true);
      return;
    }

    Router.back();
  };

  return (
    <div className={classes.login_page}>
      <div className={classes.login_form}>
        <form>
          <input type="text" placeholder="Email" ref={emailInputRef} required />
          {emailIsInvalid ? <p>가입된 이메일이 아닙니다.</p> : ""}
          <input
            type="password"
            placeholder="password"
            ref={passwordInputRef}
            required
          />
          {passwordIsInvalid ? <p>비밀번호가 올바르지 않습니다.</p> : ""}
          <button onClick={submitHandler}>로그인</button>
          <div>
            <Link href={"/auth/signup"}>회원가입</Link>
            <span>아이디/비밀번호 찾기</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
