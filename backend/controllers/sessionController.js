const Session = require("../models/Session");
const Question = require("../models/Question");
const axios = require("axios");

async function fetchYouTubeVideos(role, maxResults = 2) {
  try {
    const query = `what is ${role} OR ${role} roadmap`;
    const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: query,
        key: process.env.YOUTUBE_API_KEY,
        maxResults,
        type: "video",
      },
    });

    if (!res.data.items) return [];

    return res.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.default?.url ||
        "",
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (err) {
    console.error("YouTube fetch failed:", err.message);
    return [];
  }
}


// @desc    Create a new session and linked questions
// @route   POST /api/sessions/create
// @access  Private
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions} = req.body;
    const userId = req.user._id; // Assuming you have a middleware setting req.user
    const session = await Session.create({
        user: userId,
        role,
        experience,
        topicsToFocus,
        description,
    });

    const questionDocs = await Promise.all(
        questions.map (async (q) => {
            const question = await Question.create ({
                session: session._id,
                question: q.question,
                answer: q.answer,
            });
            return question._id;
        })
    );

    session.questions = questionDocs;

    // Fetch YouTube videos related to the role
    const videos = await fetchYouTubeVideos(role, 2); // only 2 videos
    session.videos = videos;

    await session.save();
    res.status(201).json({ success: true, session});

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all sessions for the logged-in user
// @route   GET /api/sessions/my-sessions
// @access  Private
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({user: req.user.id })
        .sort ({ createdAt: -1})
        .populate("questions");
    res.status(200).json (sessions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get a session by ID with populated questions
// @route   GET /api/sessions/:id
// @access  Private
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    // calculate progress
    const total = session.questions.length;
    const completed = session.questions.filter((q) => q.completed).length;

    if (session) {
      if (completed === 0) {
        session.status = "not-started";
      } else if (completed < total) {
        session.status = "in-progress";
      } else if (completed === total) {
        session.status = "completed";
      }
      await session.save();
    }

    res.status(200).json({
      success: true,
      session,
      progress: { completed, total },  // ✅ include progress in response
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// exports.getSessionById = async (req, res) => {
//   try {
//     const session = await Session.findById(req.params.id)
//         .populate({
//             path: "questions",
//             options: { sort: {isPinned: -1, createdAt: 1}},
//         })
//         .exec();

//     if (!session) {
//         return res
//         .status(404)
//         .json({ success: false, message: "Session not found" });
//     }
//     res.status (200).json({ success: true, session });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// @desc    Delete a session and its questions
// @route   DELETE /api/sessions/:id
// @access  Private
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
        return res.status(404).json({message: "Session not found" });
    }

    // Check if the logged-in user owns this session
    if (session.user.toString() !== req.user.id) {
        return res
        .status(401)
        .json({ message: "Not authorized to delete this session" });
    }
    // First, delete all questions linked to this session
    await Question.deleteMany({ session: session._id });

    // Then, delete the session
    await session.deleteOne();
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.markQuestionComplete = async (req, res) => {
  try {
    const { completed } = req.body;
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    question.completed = completed;
    await question.save();

    // 🔹 Recalculate session status
    const session = await Session.findById(question.session).populate("questions");

    if (session) {
      const total = session.questions.length;
      const completedCount = session.questions.filter(q => q.completed).length;

      if (completedCount === 0) {
        session.status = "not-started";
      } else if (completedCount < total) {
        session.status = "in-progress";
      } else if (completedCount === total) {
        session.status = "completed";
      }
      await session.save();
    }

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
