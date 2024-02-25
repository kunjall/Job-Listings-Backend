const jwt = require('jsonwebtoken');
const { invalidatedTokens } = require('../controllers/loginController');

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }
  if (invalidatedTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized: Token has been invalidated' });
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticateUser;


