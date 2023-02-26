export const categorySave = async (userId, category) => {
  await fetch(
    "https://blog-5a22e-default-rtdb.firebaseio.com/" +
      userId +
      "/category/.json",
    {
      method: "PUT",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application.json",
      },
    }
  );
};

export const changeCategoryOfArticles = async (
  userId,
  category,
  changedCategory
) => {
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
      category: data[key].category,
    });
  }

  const articlesInCategory = articles.filter((data) => {
    if (data.category === category) {
      return true;
    }
  });

  for (let i = 0; i < articlesInCategory.length; i++) {
    articlesInCategory[i].category = changedCategory;
    await fetch(
      "https://blog-5a22e-default-rtdb.firebaseio.com/" +
        userId +
        "/article/" +
        articlesInCategory[i].key +
        "/.json",
      {
        method: "PATCH",
        body: JSON.stringify(articlesInCategory[i]),
        headers: {
          "Content-Type": "application.json",
        },
      }
    );
  }
};

export const getCategoryByUserId = async (userId) => {
  const response = await fetch(
    "https://blog-5a22e-default-rtdb.firebaseio.com/" +
      userId +
      "/category/.json/"
  );

  const data = await response.json();

  const categories = [];

  for (const key in data) {
    categories.push({
      id: data[key].id,
      name: data[key].name,
    });
  }

  return categories;
};
