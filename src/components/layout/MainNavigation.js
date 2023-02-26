import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import CategoriesContext from "../store/category-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  const router = useRouter();
  const userId = router.query.userId;
  const blogId = props.blogId;

  const { data: session, status } = useSession();

  return (
    <CategoriesContext.Consumer>
      {(ctx) => {
        return (
          <nav className={classes.nav}>
            <div className={classes.category_list}>
              <div className={classes.category_title}>CATEGORIES</div>
              <ul>
                {ctx.categories.map((category) => {
                  return (
                    <li key={category.id} className={classes.category}>
                      <Link href={`/${userId}/category/${category.name}`}>
                        {category.name}{" "}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {status === "authenticated" && session.user.email === blogId ? (
              <div className={classes.manage}>
                <Link
                  href={`/${userId}/manage/newpost`}
                  className={classes.icon}
                >
                  글쓰기
                </Link>
                <Link
                  href={`/${userId}/manage/category`}
                  className={classes.icon}
                >
                  관리
                </Link>
              </div>
            ) : (
              ""
            )}
          </nav>
        );
      }}
    </CategoriesContext.Consumer>
  );
};

export default MainNavigation;
