"use strict";

const AccessService = require("../services/access.service");
const { SuccessResponse } = require("../core/success.response");

class AccessController {
    getQuestion1 = async (req, res, next) => {
        new SuccessResponse({
            message: "Get QuestionOK!",
            metadata: await AccessService.getQuestion1(req.body),
        }).send(res);
    };

    newQuestion = async (req, res, next) => {
        try {
            /*
				200 ok
				201 create
			*/
            return res
                .status(201)
                .json(await AccessService.newQuestion(req.body));
        } catch (error) {
            next(error);
        }
    };
    getQuestion = async (req, res, next) => {
        new SuccessResponse({
            message: "Get QuestionOK!",
            metadata: await AccessService.getQuestion(req.body),
        }).send(res);
    };
}

module.exports = new AccessController();
