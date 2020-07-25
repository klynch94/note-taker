// required packages
const express = require("express");
const path = require("path");
const fs = require('fs');
const db = require('./db/db.json');
let idNum = db.length +1;
// creating server and required code for Heroku deployment
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// basic HTML routes to display index and notes pages
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// returning all notes saved in the json file
app.get("/api/notes", (req, res) => {
    res.json(db);
})

// posing a note to the server after it has been created
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = idNum++;
    db.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {if(err) throw err});
    res.json(db);
})

// deleting a note that is already created via the note ID
app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    for (let i=0; i<db.length; i++) {
        if(db[i].id === parseInt(id)) {
            db.splice(i,1);
        }
    }
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {if(err) throw err});
    res.json(db);
})

// catch all to bring user back to the homepage
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// server is listening
app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`);
})