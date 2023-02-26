import { connectToDatabase } from "../../../../../lib/db";

const handler = async (req, res) => {
  const email = req.query.email;

  const client = await connectToDatabase();

  const db = client.db();

  const user = await db.collection("users").findOne({ email: email });

  res.status(201).json({ email: user.email, username: user.username });
  client.close();
};

export default handler;
