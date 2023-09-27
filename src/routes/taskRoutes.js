const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.post('/tasks', taskController.registerTask);
router.get('/tasks/day/:date', taskController.getTasksForDay);
router.get('/tasks/month/:month', taskController.getTasksByMonth);

module.exports = router;
