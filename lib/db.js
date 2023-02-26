import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://shagrat:bhAMTPbb7EOnQr4a@cluster0.l3qfkkt.mongodb.net/blog-project?retryWrites=true&w=majority"
  );

  return client;
};
