var express = require("express");
var router = express.Router();

const Tweet = require("../models/tweets");
const User = require("../models/users");

router.get("/", (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then((data) => {
      res.json({ result: true, tweets: data });
    });
});

router.post("/", (req, res) => {
  if (req.body.message.length > 280) {
    res.json({ result: false, error: "Tweet exceed 280 characters" });
  } else {
    const newTweet = new Tweet({
      message: req.body.message,
      hashtags: req.body.hashtags,
      username: req.body.username,
      date: new Date(),
      likes: [],
    });

    newTweet.save().then((data) => {
      res.json({ result: true });
    });
  }
});

router.post("/like", (req, res) => {
  Tweet.updateOne(
    { _id: req.body.id },
    { likes: [...likes, req.body.username] },
  ).then((data) => {
    if (data) {
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  });
});

router.post("/delete", (req, res) => {
  Tweet.deleteOne({ _id: req.body.id }).then(res.json({ result: true }));
});

module.exports = router;
