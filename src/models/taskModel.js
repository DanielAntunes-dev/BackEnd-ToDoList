const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Task = sequelize.sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Task;

