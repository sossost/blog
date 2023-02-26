import CategoriesContext from "../../store/category-context";
import classes from "./CategoryModal.module.css";

const CategoryModal = (props) => {
  const categorySelectHandler = (event) => {
    const category = event.target.id;
    props.ModalClose(false);
    props.selectCategory(category);
    console.log(category);
  };

  return (
    <CategoriesContext.Consumer>
      {(ctx) => {
        return (
          <div className={classes.panel}>
            {ctx.categories.map((category) => {
              return (
                <div
                  id={category.name}
                  className={classes.list}
                  key={category.id}
                  onClick={categorySelectHandler}
                >
                  {category.name}
                </div>
              );
            })}
          </div>
        );
      }}
    </CategoriesContext.Consumer>
  );
};

export default CategoryModal;
