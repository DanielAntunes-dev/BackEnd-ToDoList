const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;  // Usando a variável de ambiente


const saltRounds = 10;

const registerUser = async (req, res) => {
    const { name, email, password, photo_url } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            photo_url,
        });

        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Se as credenciais estiverem corretas, gera um token JWT
            const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' }); // Expira em 1 hora

            res.status(200).json({ success: true, user, token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const editUser = async (req, res) => {
    const { name, email, password, photo_url } = req.body;
    const userId = req.user.id; // Obtendo o ID do usuário a partir do token

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await UserModel.update({
            name,
            email,
            password: hashedPassword,
            photo_url,
        }, {
            where: { id: userId }
        });

        res.status(200).json({ success: true, message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const resetPasswordByEmail = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await UserModel.update({
            password: hashedPassword,
        }, {
            where: { email }
        });

        res.status(200).json({ success: true, message: 'Senha redefinida com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = {
    registerUser,
    loginUser,
    editUser,
    resetPasswordByEmail
};
