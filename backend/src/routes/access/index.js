"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();

//question
router.post("/app/question/newQuestion", (accessController.newQuestion));

//get question
router.post("/app/getquestion", (accessController.getQuestion));

router.get("/app/getquestion", (accessController.getQuestion1));


module.exports = router;
