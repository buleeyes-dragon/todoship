import { MongoClient } from "mongodb";
import env from "../env";

const MONGODB_DB = "todolist";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase(URL) {
  console.log("connectToDatabase" + URL + "!!!");
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(URL, opts);
  await client.connect();
  let db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;
  // 如果连接失败
  if (!db) {
    console.log("db is null");
  }
  return {
    client: cachedClient,
    db: cachedDb,
  };
}
