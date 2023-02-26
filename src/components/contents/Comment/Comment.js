import Link from "next/link";
import { Fragment } from "react";
import Timestamp from "../../../hooks/Timestamp";
import classes from "./Comment.module.css";

const Comment = (props) => {
  let comments = props.comments;
  if (comments === undefined) {
    comments = [];
  }

  return (
    <Fragment>
      <div className={classes.title}>
        <span>댓글 {comments.length} 개</span>
      </div>
      {comments.map((comment) => {
        const date = Timestamp(comment.date);

        return (
          <div key={comment.id} className={classes.list}>
            <div className={classes.top}>
              <span className={classes.username}>
                <Link href="#">{comment.username}</Link>
              </span>
              <span className={classes.date}>{date}</span>
            </div>
            <p className={classes.comment}>{comment.comment}</p>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Comment;
