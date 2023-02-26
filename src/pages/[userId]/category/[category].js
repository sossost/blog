import CategoryList from "../../../components/contents/CategoryList/category-list";
import { getArticlesByUserId } from "../../../helpers/api-articles";

const SelectedCategoryListPage = (props) => {
  const { articles } = props;

  return <CategoryList articles={articles} />;
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const userId = params.userId;

  const articles = await getArticlesByUserId(userId);

  return {
    props: {
      articles,
    },
  };
};

export default SelectedCategoryListPage;
