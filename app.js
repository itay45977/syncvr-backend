// npm packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Routers
const loginRouter = require('./routers/loginRouter');
const schedulerRouter = require('./routers/schedulerRouter');
const participantRouter = require('./routers/participantRouter');
const experienceRouter = require('./routers/experienceRouter');

module.exports = class Server {
  constructor() {
    this.app = express();
    this.setup();
    this.handleErrors();
  }

  setup() {
    this.setHeaders();
    this.setRouters();
  }

  setHeaders() {
    this.app.use(cors({ origin: true }));
    this.app.use(express.urlencoded({
      extended: true
    }));
    this.app.use(express.json());
  }

  setRouters() {
    this.app.use('/scheduler', schedulerRouter);
    this.app.use('/participant', participantRouter);
    this.app.use('/experience', experienceRouter);
    this.app.use('/login', loginRouter);
  }

  handleErrors() {
    this.app.use((req, res, next) => {
      const error = new Error('Bad Request');
      error.status = 404;
      next(error);
    });

    // Handle errors
    this.app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.send(`${err.status} : ${err.message}`);
    });
  }

  listen() {
    const port = process.env.PORT || 5000;
    this.app.listen(port, () => console.log(`Server running on port ${port}`));
  }

  async start() {
    await this.listen();
  }
};
