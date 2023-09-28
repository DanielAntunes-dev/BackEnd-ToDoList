const TaskModel = require('../models/taskModel');

const registerTask = async (req, res) => {
    const { task_name, task_date } = req.body;
  const userId = req.user.id; // Assuming authentication middleware sets req.user

    try {
    const newTask = await TaskModel.create({
        task_name,
        task_date,
        user_id: userId,
    });

    res.status(201).json({ success: true, task: newTask });
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    }
};

const editTask = async (req, res) => {
    const { taskId, task_name, task_date } = req.body;
    const userId = req.user.id; // Assuming authentication middleware sets req.user

    try {
    // Encontra a tarefa pelo ID e verifica se pertence ao usuário
    const task = await TaskModel.findOne({
        _id: taskId,
        user_id: userId,
    });

    if (!task) {
        return res.status(404).json({ success: false, message: 'Tarefa não encontrada' });
    }

    // Atualiza os dados da tarefa
    task.task_name = task_name;
    task.task_date = task_date;
    await task.save();

    res.status(200).json({ success: true, task });
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    }
};

const getTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
    const task = await TaskModel.findByPk(taskId);

    if (!task) {
        return res.status(404).json({ success: false, message: 'Tarefa não encontrada' });
    }

    res.status(200).json({ success: true, task });
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    }
};

const getTasksForDay = async (req, res) => {
    const { date } = req.params;
    const userId = req.user.id; // Assuming authentication middleware sets req.user

    try {
    const tasks = await TaskModel.find({
        user_id: userId,
        task_date: date,
    });

    res.status(200).json({ success: true, tasks });
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    }
};

const getTasksByMonth = async (req, res) => {
    const { month } = req.params;
    const userId = req.user.id; // Assuming authentication middleware sets req.user

    try {
    const tasks = await TaskModel.find({
        user_id: userId,
        task_date: { $regex: `^${month}` },
    });

    res.status(200).json({ success: true, tasks });
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    }
};

const getAllTasks = async (req, res) => {
    const userId = req.user.id; // Assuming authentication middleware sets req.user

    try {
    const tasks = await TaskModel.find({
        user_id: userId,
    });

    res.status(200).json({ success: true, tasks });
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    }
};

const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
    const task = await TaskModel.findByPk(taskId);

    if (!task) {
        return res.status(404).json({ success: false, message: 'Tarefa não encontrada' });
    }

    await task.destroy();

    res.status(200).json({ success: true, message: 'Tarefa deletada com sucesso' });
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    registerTask,
    getAllTasks,
    getTaskById,
    getTasksForDay,
    getTasksByMonth,
    editTask,
    deleteTask
};
