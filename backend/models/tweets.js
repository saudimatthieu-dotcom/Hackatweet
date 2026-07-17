const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  message: String,
  hashtags: [String],
  username: String,
  date: Date, 
  likes: [String],
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
