const express = require('express');
const app = express();
const fs = require("fs");


const fruit = ["apples","bananas", "pears"];
const names = ["Jane", "Yvonne", "Tom"];

const people = [{name: names[0], hobbies: "football", age: 99}, {names: names[1], hobbies: "knitting", age: 21}]
//GET request 
app.get("/api/names", (req, res) => {
    res.send(names);
});

app.get("/api/profiles", (req, res) => {
    res.send(people);
});

const server = app.listen(5000, function (){
    console.log('Node server is running https://localhost:5000 ...');
});
//Array of Objects
const person = [
    {
        "firstname": "Natasha",
        age:     29,
        eyeColour: "brown"
       
    },
    {
        firstName: "Kerry",
        age: 29,
        eyeColour: "brown"
    },
    {
        firstName: "Yasmin",
        age: 29,
        eyeColour: "brown"
    }
    
]
//Get request with id parameter
app.get("/person/:id", (req, res) => {
    let id = req.params.id;
    res.send(`This persons name is: ${person[id].firstName} and their eye colour is: ${person[id].eyeColour}`);
});
//JSON object enter in POSTMAN

// {firstname: 'Natasha', lastname: 'Love', age:35}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());
//PUT request
app.put("/api/profiles", (req, res) => {
  console.log(req.body);
  let text = JSON.stringify(req.body);
  fs.appendFile("file.txt", text,(err, data) => {
      if(err) {return "Cannot write" + data; }
  })
  res.send("Well done! You did it!");
});

let animals = ["Cat", "Dog", "Zebra"];
app.delete("/api/profiles/:id" , (req, res) => {
  console.log(animals);
  let id = req.params.id;
  animals.splice(id, 1);
  console.log(animals);
  res.send("It's all gone!");
})

// const list = require( 'profiles.json' );
// console.log(list);

app.get("/api/profiles", (req, res) => {
    res.send();
});

