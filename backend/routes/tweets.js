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
    });

    newTweet.save().then((data) => {
      res.json({ result: true });
    });
  }
});

module.exports = router;
