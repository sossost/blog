export const getCommentsOnArticleId = async (userId, articleId) => {
  const response = await fetch(
    "https://blog-5a22e-default-rtdb.firebaseio.com/" +
      userId +
      "/comment.json/"
  );

  const data = await response.json();

  const comments = [];

  for (const key in data) {
    comments.push({
      id: key,
      ...data[key],
    });
  } /* 해당 userId를 가진 블로그의 comment들을 DB에서 가져와 객체배열 comments에 담음 */

  const commentsOnArticleId = comments.filter(
    (comment) => comment.articleId === articleId
  ); /* 현재 페이지의 article에 달린 comment들을 꺼내 배열에 담음 */
  return commentsOnArticleId;
};
