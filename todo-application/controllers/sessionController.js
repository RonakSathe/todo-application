const Session = require('../models/Session');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const getSessionDetails = async (req, res) => {
  const sessions = await Session.find({ userId: req.user._id });
  res.status(200).json({ sessions });
};

const createSession = async (userId, ip) => {
  const session = new Session({
    userId,
    loginTime: new Date(),
    ip,
  });

  await session.save();
};

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {

    console.log("Decoding the token");
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Successfully");
    console.log(decoded);

    req.user = decoded;

    if (!req.user.userId) {
      return res.status(401).json({ message: 'Invalid Token:: UserId not found from the token.' });
    }
    
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }

};

module.exports = { getSessionDetails, createSession, verifyToken };
