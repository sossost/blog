import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { Fragment } from "react";
import Header from "./Header";

const Layout = (props) => {
  const blogId = props.blogId;

  return (
    <Fragment>
      <Header />
      <div className={classes.layout}>
        <MainNavigation blogId={blogId} />
        <main className={classes.content}>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
