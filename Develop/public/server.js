// required packages
const express = require("express");
const path = require("path");
// required code for Heroku deployment
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());