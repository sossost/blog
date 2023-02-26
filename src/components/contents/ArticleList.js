import classes from "./ArticleList.module.css";

const ArticleList = (props) => {
  return (
    <div>
      <div>
        <h1>전체 글</h1>
      </div>
      <div>
        <div>
          <a href="">
            <div className={classes.thumbnail}></div>
            <div className={classes.title}>Title</div>
            <div className={classes.excerpt}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
              porro reprehenderit facere qui quasi molestias ducimus. Incidunt
              earum voluptates tempore pariatur, ipsum magnam eius nulla dolores
              ab odio natus laborum!
            </div>
            <div className={classes.date}>2022.10.29.</div>
          </a>
        </div>
      </div>
    </div>
  );
};
