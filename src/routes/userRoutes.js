const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware')

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/edit', authenticateToken, userController.editUser); // Rota para editar o usuário
router.post('/reset', userController.resetPasswordByEmail); // Rota para redefinir a senha por email

module.exports = router;
