const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
app.use(express.json());

connectDB();

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('userId', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));