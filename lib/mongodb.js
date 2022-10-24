import { MongoClient } from 'mongodb';

// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = "mongodb+srv://jetzihan:20020417sn@cluster0.5f8rkha.mongodb.net/?retryWrites=true&w=majority";
const MONGODB_DB = "todolist";

// check the MongoDB URI
if (!MONGODB_URI) {
    console.log('Please define the MONGODB_URI environment variable inside .env.local');
    throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
    console.log('Please define the MONGODB_DB environment variable inside .env.local');
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    console.log("connectToDatabase");
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
    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}