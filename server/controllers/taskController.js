const mockDb = require('../config/mockDb');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await mockDb.findAll();
    const sorted = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
  }
};

// Get completed tasks
exports.getCompletedTasks = async (req, res) => {
  try {
    const tasks = await mockDb.findByStatus('Completed');
    const sorted = tasks.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving completed tasks', error: error.message });
  }
};

// Get pending tasks
exports.getPendingTasks = async (req, res) => {
  try {
    const tasks = await mockDb.findByStatus('Pending');
    const sorted = tasks.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving pending tasks', error: error.message });
  }
};

// Get upcoming tasks
exports.getUpcomingTasks = async (req, res) => {
  try {
    const tasks = await mockDb.findByStatus('Upcoming');
    const sorted = tasks.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving upcoming tasks', error: error.message });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await mockDb.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving task', error: error.message });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      startDate,
      endDate,
      startTime,
      endTime,
      category,
      subtasks
    } = req.body;

    const task = await mockDb.create({
      title,
      description,
      priority,
      status,
      startDate,
      endDate,
      startTime,
      endTime,
      category,
      subtasks
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await mockDb.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const {
      title,
      description,
      priority,
      status,
      startDate,
      endDate,
      startTime,
      endTime,
      category,
      subtasks
    } = req.body;

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (priority !== undefined) updates.priority = priority;
    if (status !== undefined) updates.status = status;
    if (startDate !== undefined) updates.startDate = startDate;
    if (endDate !== undefined) updates.endDate = endDate;
    if (startTime !== undefined) updates.startTime = startTime;
    if (endTime !== undefined) updates.endTime = endTime;
    if (category !== undefined) updates.category = category;
    if (subtasks !== undefined) updates.subtasks = subtasks;

    const updatedTask = await mockDb.updateById(req.params.id, updates);
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const success = await mockDb.deleteById(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
