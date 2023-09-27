const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const { authenticateToken } = require('./middlewares/authMiddleware');
const { handleErrors } = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('../config/db'); // Importa a configuração do banco de dados



app.use(bodyParser.json());

// Conecta ao banco de dados
async function connectToDatabase() {
    try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    }
}

connectToDatabase();

// Middleware para lidar com erros
app.use(handleErrors);

// Rotas de autenticação
app.use('/auth', authRoutes);

// Middleware de autenticação para rotas de tarefas
app.use('/tasks', authenticateToken);

// Rotas de tarefas
app.use('/tasks', taskRoutes);

module.exports = app; // Exporta a aplicação Express para ser usada no server.js
