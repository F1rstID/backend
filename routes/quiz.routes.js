const express = require('express');
const router = express.Router();
const QuizzesController = require('');
const quizzesController = new QuizzesController();

router.post('/', quizzesController.createQuiz)