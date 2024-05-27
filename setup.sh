#!/bin/bash

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express mongoose dotenv
npm install --save-dev nodemon

# Create directory structure
mkdir models routes

# Create .env file
echo "DB_URI=mongodb://localhost:27017/syncvrdb" > .env
echo "PORT=5000" >> .env

# Create .gitignore file
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore

# Create app.js
cat <<EOF > app.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define routes
app.get('/', (req, res) => {
  res.send('SyncVR Dashboard Backend Running');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(\`Server running on port \${port}\`));
EOF

# Create User model
cat <<EOF > models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', UserSchema);
EOF

# Create userRoutes
cat <<EOF > routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/adduser', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send('User added');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
EOF

# Update package.json for nodemon
sed -i '' 's/"test": "echo \\"Error: no test specified\\" && exit 1"/"start": "node app.js", "dev": "nodemon app.js"/' package.json

echo "Setup complete! Run 'npm run dev' to start the server."
