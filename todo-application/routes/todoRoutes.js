const express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
const { verifyToken } = require('../controllers/sessionController');

const router = express.Router();

router.post('/todos', verifyToken, createTodo);
router.get('/todos', verifyToken, getTodos);
router.put('/todos/:id', verifyToken, updateTodo);
router.delete('/todos/:id', verifyToken, deleteTodo);

module.exports = router;
