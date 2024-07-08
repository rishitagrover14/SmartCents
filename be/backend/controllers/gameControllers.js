const User = require('../models/user');
const Question = require('../models/question');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utilis/errorHandler');

// Get questions
exports.getQuestions = catchAsyncErrors(async (req, res, next) => {
    const questions = await Question.find();
    res.status(200).json({
        success: true,
        questions
    });
});

exports.getQuestionById = catchAsyncErrors(async (req, res, next) => {
    const { questionId } = req.params;

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found',
            });
        }

        res.status(200).json({
            success: true,
            question,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

exports.markQuestionAsCompleted = catchAsyncErrors(async (req, res, next) => {
    const { questionId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    let answeredQuestion = user.questionsAnswered.find(q => q.questionId.toString() === questionId);

    if (!answeredQuestion) {
        return res.status(404).json({
            success: false,
            message: "Question not found in user's answered questions.",
        });
    }

    if (answeredQuestion.attempts < 3) {
        return res.status(400).json({
            success: false,
            message: "You can only mark this question as completed after reaching the maximum number of attempts.",
        });
    }

    answeredQuestion.manuallyCompleted = true;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Question has been manually marked as completed.",
    });
});

exports.submitAnswer = catchAsyncErrors(async (req, res, next) => {
    const { questionId, selectedOptions } = req.body;
    const userId = req.user.id;

    console.log("User ID:", userId);
    console.log("Question ID:", questionId);
    console.log("Selected Options:", selectedOptions);

    const question = await Question.findById(questionId);
    if (!question) {
        console.log("Question not found");
        return res.status(404).json({
            success: false,
            message: "Question not found",
        });
    }

    const correctOptions = question.options.filter(option => option.isCorrect).map(option => option._id.toString());
    console.log("Correct Options:", correctOptions);

    const user = await User.findById(userId);
    if (!user) {
        console.log("User not found");
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    let answeredQuestion = user.questionsAnswered.find(q => q.questionId.toString() === questionId);
    console.log("Answered Question:", answeredQuestion);

    if (answeredQuestion) {
        if (answeredQuestion.correct) {
            console.log("Question already answered correctly");
            return res.status(400).json({
                success: false,
                message: "You have already answered this question correctly.",
            });
        }

        if (answeredQuestion.manuallyCompleted) {
            console.log("Question manually marked as completed");
            return res.status(400).json({
                success: false,
                message: "This question has been manually marked as completed.",
            });
        }

        if (answeredQuestion.attempts >= 3) {
            console.log("Maximum attempts reached");
            return res.status(400).json({
                success: false,
                message: "You have reached the maximum number of attempts for this question.",
            });
        }

        answeredQuestion.attempts += 1;
    } else {
        answeredQuestion = {
            questionId,
            attempts: 1,
            correct: false,
            manuallyCompleted: false,
        };
        user.questionsAnswered.push(answeredQuestion);
    }

    const allCorrectSelected = correctOptions.every(optionId => selectedOptions.includes(optionId)) &&
        selectedOptions.every(optionId => correctOptions.includes(optionId));
    console.log("All Correct Selected:", allCorrectSelected);

    if (allCorrectSelected) {
        user.points += correctOptions.length * 10;
        user.currentQuestion += 1;
        answeredQuestion.correct = true; // Update the correct status here

        console.log("Answer is correct. Points:", user.points, "Current Question:", user.currentQuestion);
    }

    // Ensure to update the answered question in the user's array
    const updatedQuestionsAnswered = user.questionsAnswered.map(q =>
        q.questionId.toString() === questionId ? answeredQuestion : q
    );
    user.questionsAnswered = updatedQuestionsAnswered;

    try {
        await user.save();
        console.log("User saved successfully");
        if (allCorrectSelected) {
            return res.status(200).json({
                success: true,
                isCorrect: true,
                points: user.points,
                currentQuestion: user.currentQuestion,
                message: "Correct answer! You can proceed to the next question."
            });
        } else {
            const attemptsLeft = 3 - answeredQuestion.attempts;
            console.log("Answer is incorrect. Attempts left:", attemptsLeft);
            return res.status(400).json({
                success: false,
                message: `Incorrect answer. You have ${attemptsLeft} attempt(s) left.`,
            });
        }
    } catch (error) {
        console.log("Error saving user:", error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update user answer. Please try again.',
        });
    }
});
