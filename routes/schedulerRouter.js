const { Router } = require('express');
const schedulerController = require('../controllers/schedulerController');
const schedulerRouter = Router();

schedulerRouter.get('/', schedulerController.getExperiences);
schedulerRouter.post('/create', schedulerController.createScheduler);
schedulerRouter.put('/edit', schedulerController.editScheduler);
schedulerRouter.delete('/', schedulerController.deleteScheduler);

module.exports = schedulerRouter;
