import { useState } from "react";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";

import classes from "./CommentInsertForm.module.css";
import { getProfileByEmail } from "../../../helpers/api-auth";

const CommentInsertForm = (props) => {
  const { data: session, satus } = useSession();

  const [comment, SetComment] = useState("");
  const router = useRouter();
  const userId = router.query.userId;
  const articleId = props.articleId;
  let email = "";

  if (session) {
    email = session.user.email;
  }

  const commentChangeHandler = (event) => {
    SetComment(event.target.value);
  };

  const commentSubmitHandler = async (event) => {
    event.preventDefault();
    const profile = await getProfileByEmail(email);
    const username = profile.username;

    const enteredData = {
      articleId: articleId,
      username: username,
      comment: comment,
      date: Date.now(),
    };
    await fetch(
      "https://blog-5a22e-default-rtdb.firebaseio.com/" +
        userId +
        "/comment.json",
      {
        method: "POST",
        body: JSON.stringify(enteredData),
        headers: {
          "Content-Type": "application.json",
        },
      }
    );

    SetComment("");

    // router.replace(router.asPath);
    Router.push(`/${userId}/${articleId}`, undefined, { scroll: false });
  };

  return (
    <div className={classes.comment}>
      <form>
        {session ? (
          <textarea
            type="text"
            placeholder="댓글을 입력해주세요."
            className={classes.insertForm}
            value={comment}
            onChange={commentChangeHandler}
          />
        ) : (
          <div
            className={classes.comment_text_area}
            onClick={() => {
              Router.push("/auth/login");
            }}
          >
            <textarea
              type="text"
              placeholder="댓글을 입력하시려면 로그인해주시기 바랍니다."
              className={classes.insertForm_disabled}
              disabled
            />
          </div>
        )}

        <div className={classes.insert}>
          <button className={classes.insertBtn} onClick={commentSubmitHandler}>
            입력
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentInsertForm;
