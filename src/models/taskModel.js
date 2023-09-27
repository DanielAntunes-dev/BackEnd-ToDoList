const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Task = sequelize.define('Task', {
    task_name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    task_date: {
    type: DataTypes.DATE,
    allowNull: false,
    },
    user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
});

module.exports = Task;
