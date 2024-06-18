require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/TodoModels'); // Assuming Todo model is defined in Todo.js or TodoModels.js

const app = express();
app.use(express.json());
app.use(cors());

const dbURI = process.env.dbURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on port ${process.env.PORT || 8080}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Utility function to add days to a given date
const dateAdd = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// CRUD operations for todos

// Get all todos, optionally sorted by sortBy parameter ('dueDate' or 'priority')
app.get('/get-todo', async (req, res) => {
  try {
    const { sortBy } = req.query;
    let todos;

    if (sortBy === 'dueDate') {
      todos = await Todo.find().sort({ dueDate: 1 }); // Sort by dueDate ascending
    } else if (sortBy === 'priority') {
      todos = await Todo.find().sort({ priority: -1 }); // Sort by priority descending
    } else {
      todos = await Todo.find();
    }

    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save new todo
app.post('/save-todo', async (req, res) => {
  const { text, dueDate } = req.body;

  try {
    const newTodo = new Todo({ text, dueDate });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    console.error('Error saving todo:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update todo
app.post('/update-todo', async (req, res) => {
  const { _id, text } = req.body;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id },
      { text },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete todo
app.post('/delete-todo', async (req, res) => {
  const { _id } = req.body;

  try {
    await Todo.findOneAndDelete({ _id });
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;
