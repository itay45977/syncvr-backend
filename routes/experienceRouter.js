const { Router } = require('express');
const experienceController = require('../controllers/experienceController');
const experienceRouter = Router();

experienceRouter.get('/', experienceController.getAllExperiences);
experienceRouter.get('/', experienceController.getExperience);
experienceRouter.post('/new', experienceController.createExperience);
experienceRouter.put('/', experienceController.editExperience);
experienceRouter.delete('/', experienceController.deleteExperience);

module.exports = experienceRouter;
