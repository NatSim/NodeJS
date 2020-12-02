//Watch Collection
const MongoClient = require("mongodb");
const url = "mongodb://localhost:27017/";
const databasename = "movie"; // Database name

MongoClient.connect(url)
  .then((client) => {
    const connect = client.db("movie");

    // New Collection
    const collection = connect.createCollection("watch");

    console.log("collection created");

    db.close();
  })
  .catch((err) => {
    // Handling the error
    console.log(err.Message);
    // close the connection to db when you are done with it
    db.close();
  });
