import CommentInsertForm from "./CommentInsertForm";
import Comment from "./Comment";
import classes from "./CommentList.module.css";
import { useState } from "react";

const CommentList = (props) => {
  const articleId = props.articleId;
  const comments = props.comments;

  return (
    <div className={classes.comment}>
      <Comment comments={comments} />
      <CommentInsertForm articleId={articleId} />
    </div>
  );
};

export default CommentList;
