"use strict";

const mongoose = require("mongoose");
const { model } = require("mongoose");

const DOCUMENT_NAME = "Question";

var questionSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        image: {
            data: Buffer,
            contentType: String,
        },
        answers: {
            type: [],
            required: true,
            default: [],
        },
        correctAnswers: {
            type: [],
            required: true,
            default: [],
        },
        answerImages: [
            {
                data: Buffer,
                contentType: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model(DOCUMENT_NAME, questionSchema);
