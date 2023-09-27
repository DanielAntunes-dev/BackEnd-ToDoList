const app = require('./app');  // Importa a aplicação Express do arquivo app.js
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
