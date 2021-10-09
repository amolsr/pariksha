const express = require("express");
const {
    checkEndTime,
    checkStartTime,
    remainingTime,
} = require("../controller/authController");
const questionController = require("../controller/questionController");
const responseController = require("../controller/responseController");
const router = express.Router();
const { body } = require("express-validator");

// @route   POST /get-questions
// @desc    Get 10 random questions
router.get(
    "/get-questions",
    checkStartTime,
    remainingTime,
    questionController.getQuestionsForTest
);

// @route   POST /submit-responses
// @desc    Store selected answers
router.post(
    "/submit-responses",
    checkEndTime,
    responseController.saveResponses
);

// @route   POST /end-test
// @desc    Store selected answers
router.post("/end-test", checkEndTime, responseController.endTest);

router.patch("/unfairAttempt", responseController.unfair);

module.exports = router;
