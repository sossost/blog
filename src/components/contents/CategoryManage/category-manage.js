import { useState } from "react";
import classes from "./category-manage.module.css";
import CategoryManageForm from "./category-manage-form";
import Router from "next/router";
import { changeCategoryOfArticles } from "../../../helpers/api-category";

const CategoryManage = (props) => {
  const userId = "ynnsuis";
  const categories = props.categories;
  const [category, setCategory] = useState(categories);

  const categoryPushHandler = (enteredCategory) => {
    const id = enteredCategory.id;
    const findIndex = category.findIndex((category) => category.id === id);
    let copiedCategory = [...category];
    copiedCategory[findIndex] = {
      ...category[findIndex],
      name: enteredCategory.name,
    };
    setCategory(copiedCategory);
  };

  const categoryDeleteHandler = (categoryId) => {
    let copiedCategory = [...category];

    copiedCategory.forEach((category, index) => {
      if (category.id === categoryId) {
        copiedCategory.splice(index, 1);
      }
    });

    setCategory(copiedCategory);
  };

  const categoryAddHandler = (event) => {
    event.preventDefault();
    setCategory([...category, { id: category.length + 1, name: "" }]);
  };

  const categorySaveHandler = async (event) => {
    event.preventDefault();
    if (category.length === 0) {
      alert("카테고리를 최소 한개 입력해주세요.");
      return;
    } else {
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
    }

    for (let i = 0; i < categories.length; i++) {
      if (category[i]) {
        changeCategoryOfArticles(userId, categories[i].name, category[i].name);
      }
    }

    Router.push(`/${userId}/manage/category`, undefined, { scroll: true });
    alert("카테고리 저장이 완료되었습니다.");
  };

  return (
    <div className={classes.manage}>
      <div className={classes.label}>
        <span>카테고리 관리</span>
      </div>
      <div className={classes.content}>
        {category.map((category) => {
          return (
            <CategoryManageForm
              key={category.id}
              categoryPushHandler={categoryPushHandler}
              categoryDeleteHandler={categoryDeleteHandler}
              categoryId={category.id}
              categoryName={category.name}
            />
          );
        })}

        <div className={classes.btn}>
          <button onClick={categoryAddHandler}>카테고리 추가</button>
          <button onClick={categorySaveHandler}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManage;
