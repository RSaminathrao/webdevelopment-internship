const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userDb')
  .then(() => console.log(' Connected to MongoDB'))
  .catch(err => console.error(' MongoDB connection error:', err));
  
// Schema with unique email
const UserSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// Registration route
app.post('/register', async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase(); // Normalize email

    console.log(' Registering:', email);

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();

    return res.json({ status: 'ok', message: 'User registered successfully' });
  } catch (err) {
    console.error(' Registration error:', err);
    if (err.code === 11000) {
      return res.json({ status: 'error', error: 'Email already registered' });
    }
    return res.json({ status: 'error', error: err.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase(); // Normalize email

    console.log(' Logging in:', email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: 'error', error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return res.json({ status: 'ok', message: 'Login successful!' });
    } else {
      return res.json({ status: 'error', error: 'Invalid password' });
    }
  } catch (err) {
    console.error(' Login error:', err);
    return res.json({ status: 'error', error: 'Login failed' });
  }
});

// Debug route to list all users (for development only)
app.get('/users', async (req, res) => {
  const users = await User.find({}, { password: 0 }); // Exclude password
  res.json(users);
});

// Start server
app.listen(5000, () => console.log(' Server started on port 5000'));
