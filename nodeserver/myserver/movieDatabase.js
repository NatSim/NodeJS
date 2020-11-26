// imports express framework
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

// initialise express app (calls)
const app = express();

// interact with json data
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

//
const connect = async () => {
  try {
    await client.connect();
    console.log("Connected to Local Database");
  } catch (err) {
    console.log("an error occurred :(");
    console.error(err);
  }
};

connect();

//GET request for movie database
app.get("/film", async (req, res) => {
  const allFilms = await client
    .db("movie")
    .collection("film")
    .find({})
    .toArray();

  res.json({
    message: "Here are all your films!",
    films: allFilms,
  });
});

//Creates, add to db
app.post("/films", async (req, res) => {
  const createdFilm = await client
    .db("movie")
    .collection("films")
    .insertOne(req.body);

  res.json({
    message: "Created a new film!",
    data: createdFilm,
  });
});

//GET with route param id
app.get("/films/:id", async (req, res) => {
  const matchingFilm = await client
    .db("movie")
    .collection("films")
    .findOne({ _id: new ObjectId(req.params.id) });

  res.json({
    message: "Here is that film",
    data: matchingFilm,
  });
});

//DELETE a film with an id of..
app.delete("/films/:id", async (req, res) => {
  await client
    .db("movie")
    .collection("films")
    .deleteOne({ _id: new ObjectId(req.params.id) });

  res.json({
    message: "Deleted a film",
  });
});

//patch add/update to a file
app.patch("/films/:id", async (req, res) => {
  console.log(req.body);

  const updatedFilm = await client
    .db("movie")
    .collection("films")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

  const matchingFilm = await client
    .db("movie")
    .collection("films")
    .findOne({ _id: new ObjectId(req.params.id) });

  res.json({
    message: "Updated a film",
    data: matchingFilm,
  });
});

//listen on port 4000
app.listen(4000, () => {
  console.log("Server is running");
});
