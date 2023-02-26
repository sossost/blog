import classes from "./404.module.css";

const NotFoundPage = () => {
  return (
    <div className={classes.NotFoundPage}>
      <div className={classes.content}>없는 페이지입니다.</div>
    </div>
  );
};

export default NotFoundPage;
