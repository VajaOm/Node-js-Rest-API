const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const databaseURI = process.env.DB_CONNECTION_URI;
const databaseName = process.env.DB_NAME;
console.log(databaseURI);
let db = null;

const connectDb = async () => {

    if (db) {
        return db;
    }

    const client = new MongoClient(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        db = client.db(databaseName);
        console.log("Connected to mongoDB atlas");
        return db;

    } catch (error) {
        console.log("Database connection error: ", error);
        throw error;
    }
};

module.exports = connectDb;

