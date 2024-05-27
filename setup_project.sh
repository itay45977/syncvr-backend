#!/bin/bash

# Initialize Node.js project
npm init -y

# Install Express and MongoDB dependencies
npm install express mongodb cors

# Create directory structure
mkdir config routes controllers models

# Create base files
echo "const express = require('express');
const app = require('./app');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});" > index.js

echo "const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

db.init();

app.use('/api/data', dataRoutes);

module.exports = app;" > app.js

echo "const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');
const dbName = 'syncvr';

exports.init = async () => {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};" > config/db.js

# Create placeholder route and controller files
echo "const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/', dataController.getData);

module.exports = router;" > routes/dataRoutes.js

echo "exports.getData = (req, res) => {
  res.send('API is working properly');
};" > controllers/dataController.js

# Create a model file
echo "const { MongoClient } = require('mongodb');

class DataModel {
  constructor() {
    // model setup
  }
}

module.exports = DataModel;" > models/dataModel.js

echo "Project structure created successfully."
