const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  description: String,
  thumbnail: String,
  channelTitle: String,
  publishedAt: Date,
}, { _id: false });

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    topicsToFocus: { type: String, required: true },
    description: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    status: {
      type: String,
      enum: ["in-progress", "completed", "not-started"],
      default: "not-started",
    },
    videos: [videoSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
