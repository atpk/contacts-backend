const express = require("express");
const dotenv = require("dotenv").config();
const { connectToMongoDB, getDatabase } = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/contacts", require("./routes/contactRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/*
// insert
async function insertToDB(myobj) {
  connectToMongoDB().then(async () => {
    const dbo = getDatabase();
    const collection = dbo.collection("collection");
    try {
      collection.insertOne(myobj);
    } catch (error) {
      throw new Error("error in db");
    }
  });
}

// find
async function findInDB() {
  connectToMongoDB().then(async () => {
    const dbo = getDatabase();
    const collection = dbo.collection("collection");
    try {
      const result = await collection
        .find({ $or: [{ address: "Pune" }, { address: "Hyd" }] })
        .toArray();
      console.log("________________");
      // if (result.length > 0) {
      //   console.log(result);
      // }
      console.log(result);
      console.log("________________");
    } catch (error) {
      throw new Error("error in db");
    }
  });
}

// update
async function updateDB() {
  connectToMongoDB().then(async () => {
    const dbo = getDatabase();
    const collection = dbo.collection("collection");
    try {
      const result = await collection.updateMany(
        { address: "Pune" },
        {
          $set: { address: "Mumbai" },
        }
      );
      console.log("_____update___________");
      console.log(result);
      console.log("______update__________");
    } catch (error) {
      throw new Error("error in db");
    }
  });
}

// delete
async function deleteDB() {
  connectToMongoDB().then(async () => {
    const dbo = getDatabase();
    const collection = dbo.collection("collection");
    try {
      const result = await collection.deleteMany({ address: "Mumbai" });
      console.log("_____update___________");
      console.log(result);
      console.log("______update__________");
    } catch (error) {
      throw new Error("error in db");
    }
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

var myobj = { address: "Mumbai" };
const query = {
  $or: [{ address: "Pune" }, { address: "Hyd" }],
};
// insertToDB(myobj);
findInDB();
// updateDB();
// deleteDB();
*/
