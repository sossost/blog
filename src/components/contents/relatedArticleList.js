import Link from "next/link";

const relatedArticleList = (props) => {
  return (
    <Link href="/">
      <div>
        <div>
          <h3>title</h3>
        </div>
        <div>
          <span>date</span>
        </div>
      </div>
    </Link>
  );
};

export default relatedArticleList;
