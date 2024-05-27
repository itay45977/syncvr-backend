const { mongoose } = require('mongoose');
const DAL = require('../DAL');

exports.schedulerController = {

    async getExperiences(req, res) {
        try {
            const experiences = await DAL.getAllExperiences();
            res.status(200).send(experiences);
        } catch (error) {
            res.status(500).send({ error: 'Failed to retrieve experiences' });
        }
    },

    async createScheduler(req, res) {
        try {
            const newScheduler = await DAL.createScheduler(req.body);
            res.status(200).send(newScheduler);
        } catch (error) {
            res.status(500).send({ error: 'Failed to create scheduler' });
        }
    },

    async editScheduler(req, res) {
        const { schedulerID, newSchedulerData } = req.body;
        if (mongoose.Types.ObjectId.isValid(schedulerID)) {
            try {
                const updatedScheduler = await DAL.editScheduler(schedulerID, newSchedulerData);
                if (updatedScheduler) {
                    res.status(200).send(updatedScheduler);
                } else {
                    res.status(404).send({ error: 'Scheduler not found' });
                }
            } catch (error) {
                res.status(500).send({ error: 'Failed to update scheduler' });
            }
        } else {
            res.status(400).send({ error: 'Invalid scheduler ID' });
        }
    },

    async deleteScheduler(req, res) {
        const { schedulerID } = req.body;
        if (mongoose.Types.ObjectId.isValid(schedulerID)) {
            try {
                const deletedScheduler = await DAL.deleteScheduler(schedulerID);
                if (deletedScheduler) {
                    res.status(200).send(deletedScheduler);
                } else {
                    res.status(404).send({ error: 'Scheduler not found' });
                }
            } catch (error) {
                res.status(500).send({ error: 'Failed to delete scheduler' });
            }
        } else {
            res.status(400).send({ error: 'Invalid scheduler ID' });
        }
    }
};
