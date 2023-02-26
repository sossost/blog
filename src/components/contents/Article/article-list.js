import classes from "./article-list.module.css";
import ArticleListItem from "./article-list-item";

const ArticleList = (props) => {
  const articles = props.articlesInSelectedCategory;

  return (
    <div className={classes.another_category_list}>
      <h3>{articles.category} 카테고리의 다른글</h3>
      <ul>
        {articles.map((article) => {
          return (
            <ArticleListItem
              key={article.id}
              id={article.id}
              title={article.title}
              content={article.content}
              date={article.date}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
