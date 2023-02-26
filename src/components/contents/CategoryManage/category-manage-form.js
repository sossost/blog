import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./category-manage-form.module.css";

const CategoryManageForm = (props) => {
  const categoryName = props.categoryName;
  const categoryId = props.categoryId;
  const inputRef = useRef();

  const [enteredCategory, setEnteredCategory] = useState(categoryName);
  const [isInput, setIsInput] = useState(
    categoryName === "" || categoryName === "최소 카테고리 하나를 입력해주세요."
      ? true
      : false
  ); /* 받아온 카테고리가 정의되어있지 않으면 인풋창, 있으면 리스트로 상태를 관리 */

  const categoryChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  const categoryCancelHandler = (event) => {
    event.preventDefault();
    setIsInput(false);
    if (categoryName === "") {
      props.categoryDeleteHandler(categoryId);
    } else {
      setEnteredCategory(categoryName);
    }
  };

  const categoryConfirmHandler = (event) => {
    event.preventDefault();
    props.categoryPushHandler({ id: categoryId, name: enteredCategory });
    setIsInput(false);
  };

  const categoryEditHandler = (event) => {
    event.preventDefault();
    setIsInput(true);
  };

  const categoryDeleteHandler = (event) => {
    event.preventDefault();
    props.categoryDeleteHandler(categoryId);
  };

  useEffect(() => {
    if (isInput === true) {
      inputRef.current.focus();
    }
  });

  return (
    <div className={classes.list}>
      {isInput ? (
        <Fragment>
          <input
            type="text"
            value={enteredCategory}
            onChange={categoryChangeHandler}
            className={classes.input}
            ref={inputRef}
          />
          <div className={classes.btn}>
            <button onClick={categoryCancelHandler}>취소</button>
            <button onClick={categoryConfirmHandler}>확인</button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <span>{categoryName}</span>
          <div className={classes.btn}>
            <button onClick={categoryEditHandler}>수정</button>
            <button onClick={categoryDeleteHandler}>삭제</button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CategoryManageForm;
