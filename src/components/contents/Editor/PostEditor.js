import classes from "./PostEditor.module.css";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostEditor = (props) => {
  const router = useRouter();
  const userId = router.query.userId;
  const articleId = +router.query.articleId;
  const [selectedArticle, setSelectedArticle] = useState();
  const [newArticleId, setNewArticleId] = useState();

  useEffect(() => {
    const getSelectedArticle = async () => {
      const response = await fetch(
        "https://blog-5a22e-default-rtdb.firebaseio.com/" +
          userId +
          "/article.json/"
      );

      const data = await response.json();

      const articles = [];

      for (const key in data) {
        articles.push({
          key: key,
          id: data[key].id,
          title: data[key].title,
          content: data[key].content,
          date: data[key].date,
          category: data[key].category,
          likes: data[key].likes,
          likedUsers: data[key].likedUsers,
        });
      }

      const selectedArticle = articles.find((data) => data.id === articleId);
      const newestArticle = articles.slice(-1)[0];
      const newArticleId = newestArticle.id + 1;

      setSelectedArticle(selectedArticle);
      setNewArticleId(newArticleId);
    };
    getSelectedArticle();
  }, [userId, articleId]);

  const Editor = dynamic(() => import("./Editor"), { ssr: false });

  const onAddArticle = async (enteredArticle) => {
    const date = Date.now();
    enteredArticle.date = date;

    if (enteredArticle.id === undefined) {
      enteredArticle.id = newArticleId;

      await fetch(
        "https://blog-5a22e-default-rtdb.firebaseio.com/" +
          userId +
          "/article/.json",
        {
          method: "POST",
          body: JSON.stringify(enteredArticle),
          headers: {
            "Content-Type": "application.json",
          },
        }
      );
      window.location.assign(`/${userId}`);
    } else {
      await fetch(
        "https://blog-5a22e-default-rtdb.firebaseio.com/" +
          userId +
          "/article/" +
          selectedArticle.key +
          ".json",
        {
          method: "PATCH",
          body: JSON.stringify(enteredArticle),
          headers: {
            "Content-Type": "application.json",
          },
        }
      );
      Router.push(`/${userId}/${selectedArticle.id}`, undefined, {
        scroll: true,
      });
    }
  };

  return (
    <div className={classes.editor}>
      <Editor
        submitArticleHandler={onAddArticle}
        selectedArticle={selectedArticle}
      />
    </div>
  );
};

export default PostEditor;
