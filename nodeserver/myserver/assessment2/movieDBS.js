// imports express framework
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

// initialise express app (calls)
const app = express();

// interact with json data
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

//connecting to mongodb w/callback function
const connect = async () => {
  try {
    await client.connect();
    console.log("Successfully connected to Local Database");
  } catch (err) {
    console.log("an error occurred, MongoDB not connected:(");
    console.error(err);
  }
};

connect();

//listen on port 4000
app.listen(4000, () => {
  console.log("Server is running");
});

//GET request for movie database/pagination per10 films/ ordered by title/
// Need to create a function, that for each each indexed number parameter
// returns next 10 films e.g film/1 = first 10 films, film/2 = 11=20, film/3 = 21-30  from movie collection

app.get("/films/:id", async (req, res) => {
  // const startPoint = 0; // value=1 === skipTen=0/ value=2 === skipTen=10 value=3 ===20
  //algirithm Step1:id -1
  //Step2: value * 10
  //(1 - 1 )* 10 = 0,
  //(2 - 1 )* 10 = 10
  //(3 - 1 )* 10 = 20
  const id = parseInt(req.params.id);
  console.log(id);

  const startPoint = (id) => {
    return (id - 1) * 10;
  };

  const paginatedFilms = await client
    .db("movie")
    .collection("film")
    .find({})
    .project({ _id: 0, title: 1 })
    .skip(startPoint(id))
    .limit(10)
    .toArray();

  res.json({
    message: "Here are all your paginated films!",
    films: paginatedFilms,
  });
});

//Creates film, add to db
app.post("/film", async (req, res) => {
  const createdFilm = await client
    .db("movie")
    .collection("film")
    .insertOne(req.body);

  res.json({
    message: "Created a new film!",
    data: createdFilm,
  });
});

//GET with route param id
app.get("/film/:id", async (req, res) => {
  const matchingFilm = await client
    .db("movie")
    .collection("film")
    .sort.findOne({ _id: new ObjectId(req.params.id) });

  res.json({
    message: "Here is that film",
    data: matchingFilm,
  });
});

//DELETE a film with an id of..
app.delete("/film/:id", async (req, res) => {
  await client
    .db("movie")
    .collection("film")
    .deleteOne({ _id: new ObjectId(req.params.id) });

  res.json({
    message: "Deleted a film",
  });
});

//patch add/update to a file
app.patch("/film/:id", async (req, res) => {
  console.log(req.body);

  const updatedFilm = await client
    .db("movie")
    .collection("film")
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
