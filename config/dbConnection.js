// db.js
const { MongoClient } = require("mongodb");

const url = process.env.CONNECTION_STRING; // Replace with your MongoDB connection string
const dbName = process.env.DATABASE; // Replace 'your_database_name' with the name of your database

let db = null;

// Function to connect to MongoDB and return the database object
async function connectToDB() {
  try {
    if (db) return db; // If already connected, return the existing connection

    // Connect to the MongoDB server
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log("Connected successfully to server");

    // Get the database reference
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { connectToDB };

// let client;
// let db;

// async function connectToMongoDB() {
//   try {
//     client = await MongoClient.connect(uri);
//     db = client.db(databaseName);
//     console.log(`Connected to MongoDB database: ${databaseName}`);
//     console.log("Host:", client.s.options.host);
//     console.log("Port:", client.s.options.port);
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

// function getDatabase() {
//   return db;
// }

// function getClient() {
//   return client;
// }

// module.exports = { connectToMongoDB, getDatabase, getClient };
