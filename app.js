
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./todo-application/routes/authRoutes')
const todoRoutes = require('./todo-application/routes/todoRoutes');
const sessionRoutes = require('./todo-application/routes/sessionRoutes');

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);
app.use('/api/session', sessionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
