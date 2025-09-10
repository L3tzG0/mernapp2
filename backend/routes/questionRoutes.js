const express = require('express');
const { togglePinQuestion, updateQuestionNote, addQuestionsToSession, toggleCompleteQuestion} = require('../controllers/questionController');
const { protect} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', protect, addQuestionsToSession);
router.post('/:id/pin', protect, togglePinQuestion);
router.post('/:id/note', protect, updateQuestionNote);
router.patch('/:id/complete', protect, toggleCompleteQuestion);

module.exports = router;