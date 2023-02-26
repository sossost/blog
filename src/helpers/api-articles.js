export const getArticlesByUserId = async (userId) => {
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
      ...data[key],
    });
  }

  return articles.reverse();
}; /* DB에서 해당 userId의 articles 데이터를 GET으로 받아와 빈 배열에 담음 */

export const getNewestArticle = (articles) => {
  if (articles.length !== 0) {
    const newestArticle = articles[0];
    return newestArticle;
    /* 가장 최근에 작성된 article을 선택 */
  }
};

export const getSelectedArticle = async (userId, articleId) => {
  const articles = await getArticlesByUserId(userId);
  const selectedArticle = articles.find(
    (articles) => articles.id === articleId
  );
  return selectedArticle;
}; /* url에서 받아온 article id와 일치하는 article을 꺼내옴 */

export const getArticlesByCategory = async (userId, selectedCategory) => {
  const articles = await getArticlesByUserId(userId);

  const articlesInSelectedCategory = articles.filter((data) => {
    if (data.category === selectedCategory) {
      return true;
    }
  });
  return articlesInSelectedCategory;
}; /* url로 받아온 category와 동일한 category를 갖고 있는 articles를 배열에 찾아 배열에 넣음 */
