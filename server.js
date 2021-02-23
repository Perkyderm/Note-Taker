// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

//Express
const app = express();
const PORT = process.env.PORT || 9080;

// Sets up the Express app to handle data parsing and to read static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//* Global array using Promise to read the JSON
let savedNotesGlobal = promisify(fs.readFile);
function getSavedNotes() {
  console.log("Saved Notes", savedNotesGlobal("./db/db.json", "utf8"));
  return (savedNotes = savedNotesGlobal("./db/db.json", "utf8"));
}

//* Reads db.json file and returns all saved notes as JSON
app.get("/api/notes", (req, res) => {
  getSavedNotes() // function to read the JSON
    .then((savedNotes) => {
      //response from getSavedNotes function
      res.send(JSON.parse(savedNotes));
    }) // sends to the front end
    .catch((err) => res.status(500).json(err));
});
