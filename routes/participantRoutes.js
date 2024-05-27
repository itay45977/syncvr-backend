const { Router } = require('express');
const participantController = require('../controllers/participantController');
const participantRouter = Router();

participantRouter.get('/', participantController.getAllParticipants);
participantRouter.get('/:email', participantController.getParticipant);
participantRouter.post('/new', participantController.createParticipant);
participantRouter.put('/edit', participantController.editParticipant);
participantRouter.delete('/', participantController.deleteParticipant);

module.exports = participantRouter;
