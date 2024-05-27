const { MongoClient } = require('mongodb');

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
};
