import Link from "next/link";
import { useRouter } from "next/router";
import Timestamp from "../../../hooks/Timestamp";
import classes from "./article-list-item.module.css";

const ArticleListItem = (props) => {
  const router = useRouter();
  const userId = router.query.userId;

  const date = Timestamp(props.date);

  return (
    <li className={classes.content}>
      <Link href={`/${userId}/${props.id}`}>
        <span>{props.title}</span>
      </Link>
      <span>{date}</span>
    </li>
  );
};

export default ArticleListItem;
