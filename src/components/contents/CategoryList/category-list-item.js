import Link from "next/link";
import Timestamp from "../../../hooks/Timestamp";
import classes from "./category-list-item.module.css";

const CategoryListItem = (props) => {
  const userId = "ynnsuis";

  return (
    <div className={classes.list}>
      {props.articles.map((article) => {
        const date = Timestamp(article.date); /* 타임스탬프 변환 함수 */

        const content = article.content.replace(/<[^>]*>?/g, "");
        return (
          <div key={article.id} className={classes.content}>
            <Link
              href={`/${userId}/${article.id}`}
              className={classes.content_btn}
            >
              <strong>{article.title}</strong>
              <p dangerouslySetInnerHTML={{ __html: content }}></p>
            </Link>
            <div className={classes.content_bottom}>
              <Link href={`/${userId}/category/${article.category}`}>
                {article.category}
              </Link>
              <span> | </span>
              <span>{date}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryListItem;
