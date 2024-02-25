const jwt = require('jsonwebtoken');


const loginController = async (req, res) => {
  try {
    const { username } = req.body;

    const user = { name: username };

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ userId: user.name }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const invalidatedTokens = new Set();

const logoutController = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }
    if (invalidatedTokens.has(token)) {
      return res.status(401).json({ error: 'Unauthorized: Token has already been invalidated' });
    }
    jwt.verify(token, process.env.SECRET_KEY);
    invalidatedTokens.add(token); 
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = {
  loginController,
  logoutController,
  invalidatedTokens
};
