import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import classes from "./Header.module.css";

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = router.query.userId;

  const logoutHandler = (event) => {
    event.preventDefault();
    signOut();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href={`/${userId}`}>
          <span>{userId}'s blog</span>
        </Link>
      </div>
      <div className={classes.header_icon}>
        <div className={classes.searchbar}>
          <input type="text" className={classes.search_input} />
        </div>
        <div className={classes.login}>
          {status === "authenticated" ? (
            <div>
              {/* <Link href="/auth/profile">
                <span>프로필</span>
              </Link> */}
              <Link href="#" onClick={logoutHandler}>
                <span>로그아웃</span>
              </Link>
            </div>
          ) : (
            <Link href="/auth/login">
              <span>로그인</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
