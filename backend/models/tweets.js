const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  message: String,
  hashtags: [String],
  username: String,
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
