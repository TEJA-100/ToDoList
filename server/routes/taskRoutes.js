const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Retrieve tasks by category status - specific routes MUST go before generic parameter routes
router.get('/completed', taskController.getCompletedTasks);
router.get('/pending', taskController.getPendingTasks);
router.get('/upcoming', taskController.getUpcomingTasks);

// Standard CRUD operations
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
