const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // Ajuste o caminho conforme sua estrutura

const User = sequelize.sequelize.define('User', {
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    }
}, {
  tableName: 'users' // Especifica o nome da tabela no banco de dados
});

// Definindo a associação entre User e Task
User.associate = (models) => {
  User.hasMany(models.Task, { foreignKey: 'userId' });
};

module.exports = User;
