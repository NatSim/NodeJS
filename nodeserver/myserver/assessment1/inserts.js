//add a film into new "watch" collection
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  const dbo = db.db("movie");
  const myobj = {
    watch_id: "0eafaadje5fad",
    film: "The wizard of Oz",
  };
  dbo
    .collection("watch")
    .insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("Created a new film!");
      db.close();
    })
    .catch((err) => {
      // Handling the error
      console.log(err.Message);
      // close the connection to db when you are done with it
      db.close();
    });
});
