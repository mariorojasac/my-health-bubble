const express = require("express");
const router = express.Router();
const Log = require("../models/log");
const isAuthenticated = require('../utilities/auth')


router.get("/", isAuthenticated, (req, res) => {
  Log.find({}, (err, logs) => {
    res.render("tracker.ejs", { logs, user: req.session.user });
  });
});

router.get("/new", isAuthenticated, (req, res) => {
  res.render("new.ejs");
});

router.delete("/:id", isAuthenticated,  (req, res) => {
  Log.findByIdAndDelete(req.params.id, (err, deletedLogs) => {
    res.redirect("/trackedlogs");
  });
});

router.put("/:id", (req, res) => {
  Log.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedLogs) => {
      console.log(err);
      if (err) {
        res.json({ message: "sorry, something went wrong" });
      } else {
        res.redirect("/trackedlogs");
      }
    }
  );
});

router.post("/", (req, res) => {
  req.body.completed = !!req.body.completed;
  Log.create(req.body, (err, log) => {
    res.redirect("/trackedlogs");
  });
});

router.get("/:id/edit", isAuthenticated, (req, res) => {
  Log.findById(req.params.id, (err, log) => {
    res.render("edit.ejs", { log });
  });
});

router.get("/:id", async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    res.render("show.ejs", { log });
  } catch (error) {
    console.log(error.message);
    res.render("show.ejs");
  }
});

module.exports = router;
