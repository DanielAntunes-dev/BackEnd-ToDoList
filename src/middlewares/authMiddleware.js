const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;  // Agora obtendo a chave do .env

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token não fornecido' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {  // Usando jwtSecret ao invés de secretKey
    if (err) {
      return res.status(403).json({ success: false, message: 'Token inválido' });
    }

    // Se o token é válido, armazene o usuário na requisição para uso posterior
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
