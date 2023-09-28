const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.post('/tasks', taskController.registerTask);  // Cria uma nova tarefa
router.get('/tasks', taskController.getAllTasks);  // Obtém todas as tarefas
router.get('/tasks/:id', taskController.getTaskById);  // Obtém uma tarefa por ID
router.put('/tasks/:id', taskController.editTask);  // Edita uma tarefa
router.delete('/tasks/:id', taskController.deleteTask);  // Deleta uma tarefa
router.get('/tasks/day/:date', taskController.getTasksForDay);  // Obtém tarefas para um dia específico
router.get('/tasks/month/:month', taskController.getTasksByMonth);  // Obtém tarefas para um mês específico

module.exports = router;
