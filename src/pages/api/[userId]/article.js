import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const userId = req.query.userId;

  if (req.method === "POST") {
    const article = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://shagrat:bhAMTPbb7EOnQr4a@cluster0.l3qfkkt.mongodb.net/blog-project?retryWrites=true&w=majority"
    );
    const db = client.db();

    await db.collection(userId).insertOne({ article });

    res.status(201).json({ message: "작성완료" });

    client.close();
  }
};

export default handler;
