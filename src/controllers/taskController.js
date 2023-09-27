const TaskModel = require('../models/taskModel');
const moment = require('moment');

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

module.exports = {
    registerTask,
    getTasksForDay,
    getTasksByMonth,
};
