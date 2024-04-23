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
        const session = await Question.startSession();
        session.startTransaction();
        
        try {
            for (const question of questionData) {
                const existingQuestion = await Question.findOne({
                    content: question.content,
                }).lean();
        
                if (existingQuestion) {
                    await session.abortTransaction(); // Hủy giao dịch nếu có câu hỏi nào bị trùng lặp
                    session.endSession();
                    return {
                        status: "error",
                        code: "403",
                        message: `Question with content ${question.content} already exists!`,
                    };
                }
            }
        
            // Nếu không có câu hỏi nào bị trùng lặp, tiếp tục tạo câu hỏi mới
            for (const question of questionData) {
                const newData = {
                    content: question.content,
                    image: question.image || { data: null, contentType: null },
                    answers: question.answers || [],
                    correctAnswers: question.correctAnswers || [],
                    answerImages: question.answerImages || [],
                };
        
                const newQuestion = await Question.create(newData);
        
                if (!newQuestion) {
                    await session.abortTransaction();
                    session.endSession();
                    throw new Error("Failed to create question");
                }
            }
        
            await session.commitTransaction(); // Commit giao dịch nếu tất cả câu hỏi đều hợp lệ
            session.endSession();
            return {
                code: "201",
                message: "All questions created successfully",
            };
        }  finally {
        }
    };
    
}

module.exports = AccessService;
