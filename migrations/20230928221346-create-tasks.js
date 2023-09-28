'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', { 
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dueDate: {
        type:Sequelize.DATE,
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
        },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
    });
    
    },

    async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
    }
};
