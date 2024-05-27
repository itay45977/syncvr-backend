const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

db.init();

app.use('/api/data', dataRoutes);

module.exports = app;
