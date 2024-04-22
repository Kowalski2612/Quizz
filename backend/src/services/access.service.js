"use strict";

const { BadRequestError } = require("../core/error.response");
const Question = require("../models/question.model");

const RoleQuestion = {
    CONTENT: "content",
};

class AccessService {
    static getQuestion1 = async () => {
        try {
            const questions = await Question.find().lean();
            return {
                questions: questions
            };
        } catch (error) {
            throw new BadRequestError("Question already exists!");
        }
    };
    static getQuestion = async ({limit}) => {
        try {
            const questions = await Question.find().limit(limit).lean();
            return {
                questions: questions
            };
        } catch (error) {
            throw new BadRequestError("Question already exists!");
        }
    };
    static newQuestion = async (questionData) => {
        console.log(`:question`, questionData);
        try {
            const existingQuestion = await Question.findOne({
                content: questionData.content,
            }).lean();
            if (existingQuestion) {
                throw new BadRequestError({
                    message: "Question already exists!",
                    statusCode: "error_code",
                });
            }            

            const newData = {
                content: questionData.content,
                image: questionData.image || { data: null, contentType: null },
                answers: questionData.answers || [],
                correctAnswers: questionData.correctAnswers || [],
                answerImages: questionData.answerImages || [],
            };

            const newQuestion = await Question.create(newData);

            if (newQuestion) {
                return {
                    code: "201",
                    message: "Question created successfully",
                    question: newQuestion,
                };
            } else {
                throw new Error("Failed to create question");
            }
        } catch (error) {
            console.error("Error creating question:", error);
            return {
                code: "error_code",
                message: "An error occurred while creating the question",
            };
        }
    };
}

module.exports = AccessService;
