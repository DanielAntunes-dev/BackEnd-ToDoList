const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Adicionando a configuração do dotenv

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
});

// Testar a conexão
sequelize.authenticate()
    .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
    });

// Definindo o modelo User
const User = sequelize.define('User', {
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
    },
});

// Definindo o modelo Task
const Task = sequelize.define('Task', {
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

// Definindo relacionamentos entre modelos
User.hasMany(Task);
Task.belongsTo(User);

// Sincronize os modelos com o banco de dados
// force: true irá recriar as tabelas se elas já existirem
sequelize.sync({ force: false })
    .then(() => {
        console.log('Tabelas sincronizadas com sucesso.');
    })
    .catch((error) => {
        console.error('Não foi possível sincronizar as tabelas:', error);
    });

module.exports = {
    sequelize,
    User,
    Task,
};
