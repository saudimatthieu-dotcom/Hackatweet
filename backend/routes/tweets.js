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
      username: req.body.username,
      date: new Date(),
      likes: [],
    });

    newTweet.save().then(() => {
      res.json({ result: true });
    });
  }
});

router.put("/like", (req, res) => {
  Tweet.findById(req.body._id).then((tweet) => {
    if (!tweet) {
      res.json({ result: false, error: "Tweet not found" });
      return;
    }
    const update = tweet.likes.includes(req.body.username)
      ? { $pull: { likes: req.body.username } }
      : { $push: { likes: req.body.username } };
    Tweet.updateOne({ _id: req.body._id }, update).then(() => {
      res.json({ result: true });
    });
  });
});

router.delete("/delete", (req, res) => {
  Tweet.deleteOne({ _id: req.body._id }).then(() => res.json({ result: true }));
});


module.exports = router;
