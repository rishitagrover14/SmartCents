const express = require('express');
const { getQuestions, submitAnswer, getQuestionById, markQuestionAsCompleted} = require('../controllers/gameControllers');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/questions').get(isAuthenticatedUser, getQuestions);
router.route('/questions/:questionId').get(isAuthenticatedUser, getQuestionById);
router.route('/question/:questionId/mark-completed').patch(isAuthenticatedUser, markQuestionAsCompleted);
router.route('/submit-answer').post(isAuthenticatedUser, submitAnswer);


module.exports = router;
