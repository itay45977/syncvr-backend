const DAL = require('../DAL');

exports.participantController = {

    async getAllParticipants(req, res) {
        try {
            const participants = await DAL.getAllParticipants();
            res.status(200).send(participants);
        } catch (error) {
            res.status(500).send({ error: 'Failed to retrieve participants' });
        }
    },

    async getParticipant(req, res) {
        const participantEmail = req.params.email;
        try {
            const participant = await DAL.getParticipantByEmail(participantEmail);
            if (participant) {
                res.status(200).send(participant);
            } else {
                res.status(404).send({ error: 'Participant not found' });
            }
        } catch (error) {
            res.status(500).send({ error: 'Failed to retrieve participant' });
        }
    },

    async createParticipant(req, res) {
        try {
            const newParticipant = await DAL.createParticipant(req.body);
            res.status(200).send(newParticipant);
        } catch (error) {
            res.status(500).send({ error: 'Failed to create participant' });
        }
    },

    async editParticipant(req, res) {
        const { participantID, newParticipantData } = req.body;
        try {
            const updatedParticipant = await DAL.editParticipant(participantID, newParticipantData);
            if (updatedParticipant) {
                res.status(200).send(updatedParticipant);
            } else {
                res.status(404).send({ error: 'Participant not found' });
            }
        } catch (error) {
            res.status(500).send({ error: 'Failed to update participant' });
        }
    },

    async deleteParticipant(req, res) {
        const { participantID } = req.body;
        try {
            const deletedParticipant = await DAL.deleteParticipant(participantID);
            if (deletedParticipant) {
                res.status(200).send(deletedParticipant);
            } else {
                res.status(404).send({ error: 'Participant not found' });
            }
        } catch (error) {
            res.status(500).send({ error: 'Failed to delete participant' });
        }
    }
};
