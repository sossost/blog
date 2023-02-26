import CategoryManage from "../../../../components/contents/CategoryManage/category-manage";
import { getCategoryByUserId } from "../../../../helpers/api-category";
import { getSession } from "next-auth/react";
import { getBlogIdByUserId } from "../../../../helpers/api-auth";

const CategoryManagePage = (props) => {
  const { categories } = props;

  return <CategoryManage categories={categories} />;
};

export const getServerSideProps = async (context) => {
  const userId = context.query.userId;

  const categories = await getCategoryByUserId(userId);

  const blogId = await getBlogIdByUserId(userId);

  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanet: false,
      },
    };
  }
  const sessionEmail = session.user.email;

  if (blogId !== sessionEmail) {
    return {
      redirect: {
        destination: `/${userId}`,
        permanet: false,
      },
    };
  }

  return {
    props: {
      categories,
    },
  };
};

export default CategoryManagePage;
