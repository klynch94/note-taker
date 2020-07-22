// required packages
const express = require("express");
const path = require("path");
// required code for Heroku deployment
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// arry to save notes
const notes = [];

// basic HTML routes to display index and notes pages
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`);
})