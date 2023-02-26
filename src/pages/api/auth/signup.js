import { hashPassword } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password, username } = JSON.parse(req.body);

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7 ||
      !username ||
      username.trim().length < 2
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      req.stats(422).json({ message: "이미 가입한 이메일 입니다." });
      client.close();
      return;
    } /* 이메일 중복 체크 */

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
      username: username,
    });

    res.status(201).json({ message: "Created user!" });
    client.close();
  }
};

export default handler;
