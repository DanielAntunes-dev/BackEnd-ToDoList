const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nome-do-projeto-no-banco-de-dados', 'usuario', 'senha', {
    host: 'localhost',
    port: 5433,
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
    type: Sequelize.STRING,
    allowNull: false,
    },
    email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    },
    password: {
    type: Sequelize.STRING,
    allowNull: false,
    },
});

// Definindo o modelo Task
const Task = sequelize.define('Task', {
    title: {
    type: Sequelize.STRING,
    allowNull: false,
    },
    dueDate: {
    type: Sequelize.DATE,
    },
    completed: {
    type: Sequelize.BOOLEAN,
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


module.exports = sequelize;