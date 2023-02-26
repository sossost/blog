import Link from "next/link";
import Timestamp from "../../../hooks/Timestamp";
import { useSession } from "next-auth/react";

import Router from "next/router";
import { useRouter } from "next/router";
import Image from "next/image";
import { Fragment } from "react";

import classes from "./Article.module.css";

const Article = (props) => {
  const { blogId, article } = props;

  const router = useRouter();
  const userId = router.query.userId;

  let loginId = "";
  let sessionEmail = "";
  const { data: session, status } = useSession();
  if (session) {
    loginId = session.user.email;
    sessionEmail = session.user.email;
  }

  const content = article.content;

  let likes = article.likes;
  let likedUsers = article.likedUsers;

  const date = Timestamp(article.date);

  const articleDeleteHandler = (event) => {
    event.preventDefault();
    window.confirm("정말로 삭제하시겠습니까?");
    fetch(
      "https://blog-5a22e-default-rtdb.firebaseio.com/" +
        userId +
        "/article/" +
        article.key +
        ".json",
      {
        method: "DELETE",
      }
    );
    alert("정상적으로 삭제되었습니다.");
    Router.push(`/${userId}`, undefined, { scroll: false });
  };

  const likeBtnHandler = async (event) => {
    event.preventDefault();
    if (likedUsers.includes(loginId)) {
      for (let i = 0; i < likedUsers.length; i++) {
        if (likedUsers[i] === loginId) {
          likedUsers.splice(i, 1);
          i--;
        }
      }
      likes = likes - 1;
    } else {
      likes = likes + 1;
      likedUsers = [...likedUsers, loginId];
    }

    await fetch(
      "https://blog-5a22e-default-rtdb.firebaseio.com/" +
        userId +
        "/article/" +
        article.key +
        ".json",
      {
        method: "PATCH",
        body: JSON.stringify({ likes: likes, likedUsers: likedUsers }),
        headers: {
          "Content-Type": "application.json",
        },
      }
    );
    Router.push(`/${userId}/${article.id}`, undefined, { scroll: false });
  };

  return (
    <div className={classes.content}>
      <div className={classes.title_area}>
        <h3>{article.title}</h3>
        <span className={classes.info}>
          <Link
            href={`/${userId}/category/${article.category}`}
            className={classes.category}
          >
            {article.category}
          </Link>
          <span> | </span>
          <span>{date}</span>
          {blogId === sessionEmail ? (
            <Fragment>
              <span> | </span>
              <Link href={`/${userId}/manage/newpost/${article.id}`}>수정</Link>
              <span> | </span>
              <Link href="#" onClick={articleDeleteHandler}>
                삭제
              </Link>
            </Fragment>
          ) : (
            ""
          )}
        </span>
      </div>
      <div className={classes.view}>
        <div
          className={classes.article_area}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <div className={classes.post_btn_area}>
          <div className={classes.post_btn}>
            <Link href="/" onClick={likeBtnHandler}>
              <span>
                {likedUsers.includes(loginId) ? (
                  <Image
                    src="/heart filled.png"
                    alt="heart"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Image
                    src="/heart outline.png"
                    alt="heart"
                    width={16}
                    height={16}
                  />
                )}
              </span>
              <span>{likes}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
