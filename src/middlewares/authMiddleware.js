const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/config'); // Configure uma chave secreta para o token

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
    });
};

module.exports = {
  authenticateToken,
};
