import CategoryListItem from "./category-list-item";
import classes from "./category-list.module.css";
import { useRouter } from "next/router";
import { Fragment } from "react";

const CategoryList = (props) => {
  const router = useRouter();
  const selectedCategory = router.query.category;
  const articles = props.articles;
  const articlesInSelectedCategory = articles.filter((data) => {
    if (data.category === selectedCategory) {
      return true;
    }
  });
  return (
    <div>
      <div className={classes.title}>
        {selectedCategory} ({articlesInSelectedCategory.length})
      </div>
      <Fragment>
        {articlesInSelectedCategory.length === 0 ? (
          <div>아직 작성된 글이 없습니다.</div>
        ) : (
          <CategoryListItem
            articles={
              selectedCategory === undefined
                ? articles
                : articlesInSelectedCategory
            } /* 선택한 category가 정의되어있지 않으면, 모든 article들을, 있으면 해당 카테고리 article들을 넘겨줌 */
          />
        )}
      </Fragment>
    </div>
  );
};

export default CategoryList;
