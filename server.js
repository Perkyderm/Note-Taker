// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

//Express
const app = express();
const PORT = process.env.PORT || 8282;

// Sets up the Express app to handle data parsing and to read static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//* Global array using Promise to read the JSON
//let savedNotesGlobal = json.promisify(fs.readFile);
//function getSavedNotes() {
//console.log("Saved Notes", savedNotesGlobal("./db/db.json", "utf8"));
//return (savedNotes = savedNotesGlobal("./db/db.json", "utf8"));
//}

//* Reads db.json file and returns all saved notes as JSON
app.get("/api/notes", (req, res) => {
  getSavedNotes() // function to read the JSON
    .then((savedNotes) => {
      //response from getSavedNotes function
      res.send(JSON.parse(savedNotes));
    }) // sends to the front end
    .catch((err) => res.status(500).json(err));
});

// Receives a new note to save on the request body and adds to db.json file and returns note to client
app.post("/api/notes", (req, res) => {
  // reads db.json
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  // creates unique ID for each note
  let id = crypto.randomBytes(16).toString("hex");
  let newNote = {
    // creates a new note object with the ID
    title: req.body.title,
    text: req.body.text,
    id: id,
  };
  console.log("newNote:", newNote);

  // pushes the new notes to the notes.index page
  savedNotes.push(newNote);

  // writes all new notes to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes), (err) => {
    if (err) throw err;
    console.log("error");
  });
  console.log("A note new has been written");
  return res.json(savedNotes);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// returns index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("It's over here! http://localhost:" + PORT);
});
