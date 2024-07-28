const Todo = require('../models/Todo');
const {ObjectId} = require('mongoose').Types;

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId;
  const todo = new Todo({
    title,
    description,
    userId,
  });
  await todo.save();
  res.status(201).json({ todo });
};


const getTodos = async (req, res) => {
  // TODO: const userId = req.user._id;

  const userId = req.user.userId;
  const todos = await Todo.find({ userId });

  res.status(200).json({ todos });
};



const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const userId = req.user.userId;

  const todo = await Todo.findOneAndUpdate(
    { _id: new ObjectId(id), userId },
    { title, description, completed },
    { new: true }
  );

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json({ todo });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const todo = await Todo.findOneAndDelete({ _id: new ObjectId(id), userId });

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json({ message: 'Todo deleted' });
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
