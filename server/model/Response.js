const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    testId: mongoose.Schema.Types.ObjectId,
    hasAttempted: {
        type: Boolean,
        default: false,
    },
    switchCounter: {
        type: Number,
        default: 0,
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
        },
    ],
    responses: [
        {
            question: {
                type: String,
            },
            response: {
                type: String,
            },
            status: {
                type: String,
            },
        },
    ],
},
    { timestamps: true });

module.exports = Test = mongoose.model("Response", ResponseSchema);
