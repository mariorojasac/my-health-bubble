const mongoose = require('mongoose')
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const isAuthenticated = require('../utilities/auth');

router.get("/", isAuthenticated, (req, res) => {
  User.findById(req.session.user, (err, user) => {
    res.render("profile.ejs", { user });
  });
});

module.exports = router;
