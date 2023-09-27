const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

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
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
