import classes from "./MainContent.module.css";

const MainContent = (props) => {
  return <main className={classes.MainContainer}>{props.children}</main>;
};

export default MainContent;
