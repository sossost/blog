import { getSession } from "next-auth/react";
import { getBlogIdByUserId } from "../../../../helpers/api-auth";

import PostEditor from "../../../../components/contents/Editor/PostEditor";

const newpostPage = (props) => {
  const { isInvalidPage } = props;

  return <PostEditor />;
};

export const getServerSideProps = async (context) => {
  const userId = context.query.userId;

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
    props: {},
  };
};

export default newpostPage;
