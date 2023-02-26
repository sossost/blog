import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        }); /* DB에 해당 이메일이 있는지 확인 */

        if (!user) {
          client.close();
          throw new Error("가입된 이메일이 아닙니다.");
        } /* DB에 해당 이메일이 없는 경우 에러 메시지 전달 */

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        ); /* 해시된 password 비교로 password가 유효한지 체크 */

        if (!isValid) {
          client.close();
          throw new Error("올바른 비밀번호가 아닙니다.");
        } /* 유효한 password가 아닌경우 에러 메세지 전달 */

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
