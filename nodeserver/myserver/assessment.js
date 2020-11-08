const express = require('express');
const app = express();
const fs = require("fs");

//Runs in Terminal 
const server = app.listen(5000, function (){
    console.log('Node server is running https://localhost:5000 ...');
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());

//JSON FILE DATA;
const profiles = [{
    "profile1": {
        "firstname" : "Maya",
        "lastname" : "Angelou",
        "occupation" : [
            "Poet",
            "Novelist"
        ],
        "height" : 1830,
        "country" : "United States",
        "bio" : "American poet, singer, memoirist, and civil rights activist. She published seven autobiographies, three books of essays, several books of poetry, and is credited with a list of plays, movies, and television shows spanning over 50 years"
    },
    "profile2" : {
        "firstname" : "Toni",
        "lastname" : "Morrison",
        "occupation" : [
            "Novelist"
        ],
          
            "country" : "United States",
            "bio" : "American novelist, essayist, book editor, and college professor. Her first novel, The Bluest Eye, was published in 1970. The critically acclaimed Song of Solomon (1977) brought her national attention and won the National Book Critics Circle Award. In 1988, Morrison won the Pulitzer Prize for Beloved (1987); she gained worldwide recognition when she was awarded the Nobel Prize in Literature in 1993."
    },
    "profile3" : {
            "firstname" : "Wangari",
            "lastname" : "Maathai",
            "occupation" : [
                    "Writer",
                    "Political Activist",
                    "Environmentalist"
            ],
            "country" : "Kenya",
            "bio" : "Renowned Kenyan social, environmental and political activist and the first African woman to win the Nobel Prize. She was educated in the United States at Mount St. Scholastica (Benedictine College) and the University of Pittsburgh, as well as the University of Nairobi in Kenya"
    },
    "profile4" : {
            "firstname" : "Zora",
            "lastname" : "Neale",
            "occupation" : [
                    "Filmaker",
                    "Anthropologist"
            ],
            "country" : "United States",
            "bio" : " American author, anthropologist, and filmmaker. She portrayed racial struggles in the early-1900s American South and published research on hoodoo.[3] The most popular of her four novels is Their Eyes Were Watching God, published in 1937. She also wrote more than 50 short stories, plays, and essays."
    }
 }]

//GET request
 app.get("/api/profiles", (req, res ) => {
     res.send(profiles);
 });

 //GET request with ID
 app.get("/profiles/:id", (req, res ) => {
     let id = req.params.id;
     res.send(`This person is: ${profiles[id].profile1}`);
 });

 //PUT request (with ID)
 app.put("/api/profiles", (req, res) => {
     console.log(req.body);
     let text = JSON.stringify(req.body);
     fs.appendFile("file2.txt", text,(err, data) =>{
         if(err) {return "Cannot write" + data; }
     })
     res.send("Well done! You did it");
 });

 //DELETE request 
let me = ["Natasha","Black Codher", 29];
 
app.delete("/apo/profiles/:id" , (req, res) => {
     console.log(me);
     let id = req.params.id;
     me.splice(id,1);
     console.log(me);
     res.send("It's all gone!!");
 })





 