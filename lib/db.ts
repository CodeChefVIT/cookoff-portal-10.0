import { MongoClient } from "mongodb";

let client: MongoClient | null = null;
let promise: Promise<MongoClient> | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  if (client) return client;
  if (!promise) {
    promise = MongoClient.connect(uri).then((c) => {
      client = c;
      return c;
    });
  }
  return promise;
}
