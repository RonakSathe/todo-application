const jwt = require('jsonwebtoken');
const User = require('../models/User');
const supabase = require('../../supabaseClient');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  // Create user in MongoDB
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  // Register user in Supabase
  const { user:supabaseUser,error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json({ message: 'User registered successfully' });
};

// ==================================================================
//LOGIN
// ==================================================================


const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user in MongoDB
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isValidPassword = await bcrypt.compare(password,user.password);

  if (!isValidPassword) {
    return res.status(400).json({ message: 'Incorrect Password... Please try Again.' });
  }

  // Generating token of JWT
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
};

module.exports = { register, login };
