import {
  getArticlesByUserId,
  getArticlesByCategory,
  getNewestArticle,
} from "../../helpers/api-articles";
import { Fragment } from "react";
import ArticleList from "../../components/contents/Article/article-list";
import Article from "../../components/contents/Article/article";
import CommentList from "../../components/contents/Comment/CommentList";
import { getCommentsOnArticleId } from "../../helpers/api-comments";
import { getBlogIdByUserId } from "../../helpers/api-auth";

const MainPage = (props) => {
  const {
    blogId,
    articles,
    newestArticle,
    articlesInSelectedCategory,
    commentsOnArticleId,
  } = props;

  return (
    <Fragment>
      {articles.length === 0 ? (
        <div>게시글이 없습니다.</div>
      ) : (
        <Fragment>
          <Article blogId={blogId} article={newestArticle} />
          <CommentList
            articleId={newestArticle.id}
            comments={commentsOnArticleId}
          />
          <ArticleList
            articlesInSelectedCategory={articlesInSelectedCategory}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const userId = params.userId;
  /* context에서 동적페이지 매개변수 userId값을 상수 userId에 저장 */

  const blogId = await getBlogIdByUserId(userId);
  if (!blogId) {
    return {
      props: {},
    };
  } /* URL 에서 받아온 blogId를 통해 존재하는 페이지인지 확인 */

  const articles = await getArticlesByUserId(userId);
  const newestArticle = await getNewestArticle(articles);
  const selectedCategory = newestArticle.category;
  const articlesInSelectedCategory = await getArticlesByCategory(
    userId,
    selectedCategory
  );

  const newestArticleId = newestArticle.id;
  const commentsOnArticleId = await getCommentsOnArticleId(
    userId,
    newestArticleId
  );

  return {
    props: {
      blogId,
      articles,
      newestArticle,
      articlesInSelectedCategory,
      commentsOnArticleId,
    },
  }; /* getServerSideProps로 클라이언트에 데이터를 넘겨줌 */
};

export default MainPage;
