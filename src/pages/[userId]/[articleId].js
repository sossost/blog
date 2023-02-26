import { Fragment } from "react";
import Article from "../../components/contents/Article/article";
import ArticleList from "../../components/contents/Article/article-list";
import CommentList from "../../components/contents/Comment/CommentList";
import {
  getSelectedArticle,
  getArticlesByCategory,
} from "../../helpers/api-articles";
import { getBlogIdByUserId } from "../../helpers/api-auth";
import { getCommentsOnArticleId } from "../../helpers/api-comments";

const ArticlePage = (props) => {
  const {
    blogId,
    selectedArticle,
    articlesInSelectedCategory,
    commentsOnArticleId,
  } = props;

  return (
    <Fragment>
      <Article blogId={blogId} article={selectedArticle} />
      <CommentList
        articleId={selectedArticle.id}
        comments={commentsOnArticleId}
      />
      <ArticleList articlesInSelectedCategory={articlesInSelectedCategory} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const userId = params.userId;
  const articleId = +params.articleId;
  /* context에서 동적페이지 매개변수 userId값을 상수 userId에 저장 */

  const blogId = await getBlogIdByUserId(userId);
  if (!blogId) {
    return {
      props: {},
    };
  } /* URL 에서 받아온 blogId를 통해 존재하는 페이지인지 확인 */

  const selectedArticle = await getSelectedArticle(userId, articleId);
  if (!selectedArticle) {
    return {
      notFound: true,
    };
  }
  const commentsOnArticleId = await getCommentsOnArticleId(userId, articleId);
  const selectedCategory = selectedArticle.category;
  const articlesInSelectedCategory = await getArticlesByCategory(
    userId,
    selectedCategory
  );

  return {
    props: {
      blogId,
      selectedArticle,
      commentsOnArticleId,
      articlesInSelectedCategory,
    },
  }; /* getServerSideProps로 클라이언트 서버에 데이터를 넘겨줌 */
};

export default ArticlePage;
