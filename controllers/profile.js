const mongoose = require('mongoose')
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");


// router.get("/", (req, res) => {
//   res.render("home.ejs", { user: req.session.user });
// });


// Protected Route
router.get("/", isAuthenticated, (req, res) => {
  User.findById(req.session.user, (err, user) => {
    res.render("profile.ejs", { user });
  });
});

// Utility Functions

// Auth middleware
function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    // user is not logged in
    return res.redirect("/login");
  }
  next(); // user is authenticated, keep moving on to the next step
}

module.exports = router;
