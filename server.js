const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");
const indexController = require('./controllers/index');
const logsController = require('./controllers/logs')
const usersController = require('./controllers/users');
const profileController = require('./controllers/profile')
const expressSession = require('express-session');

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (error) => {
  console.log(`Error connecting to MongoDb: ${error.message}`);
});

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(expressSession({
    secret: 'cknlkclnclnen',
    resave: false,
    saveUninitialized: false
}))

app.use('/', indexController);
app.use('/trackedlogs', logsController);
app.use('/', usersController);
app.use('/profile', profileController)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
