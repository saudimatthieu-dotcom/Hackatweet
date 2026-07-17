var express = require("express");
var router = express.Router();

const Tweet = require("../models/tweets");

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


router.get("/", (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then((data) => {
      res.json({ result: true, tweets: data });
    });
});


module.exports = router;
