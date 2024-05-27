const { mongoose } = require('mongoose');
const DAL = require('../DAL');

exports.experienceController = {

    async getAllExperiences(req, res) {
        try {
            const experiences = await DAL.getAllExperiences();
            res.status(200).send(experiences);
        } catch (error) {
            res.status(500).send({ error: 'Failed to retrieve experiences' });
        }
    },

    async getExperience(req, res) {
        const experienceID = req.params.id;
        if (mongoose.Types.ObjectId.isValid(experienceID)) {
            try {
                const experience = await DAL.getExperienceById(experienceID);
                if (experience) {
                    res.status(200).send(experience);
                } else {
                    res.status(404).send({ error: 'Experience not found' });
                }
            } catch (error) {
                res.status(500).send({ error: 'Failed to retrieve experience' });
            }
        } else {
            res.status(400).send({ error: 'Invalid experience ID' });
        }
    },

    async createExperience(req, res) {
        try {
            const newExperience = await DAL.createExperience(req.body);
            res.status(200).send(newExperience);
        } catch (error) {
            res.status(500).send({ error: 'Failed to create experience' });
        }
    },

    async editExperience(req, res) {
        const experienceID = req.params.id;
        const newExperienceData = req.body;
        if (mongoose.Types.ObjectId.isValid(experienceID)) {
            try {
                const updatedExperience = await DAL.editExperience(experienceID, newExperienceData);
                if (updatedExperience) {
                    res.status(200).send(updatedExperience);
                } else {
                    res.status(404).send({ error: 'Experience not found' });
                }
            } catch (error) {
                res.status(500).send({ error: 'Failed to update experience' });
            }
        } else {
            res.status(400).send({ error: 'Invalid experience ID' });
        }
    },

    async deleteExperience(req, res) {
        const experienceID = req.params.id;
        if (mongoose.Types.ObjectId.isValid(experienceID)) {
            try {
                const deletedExperience = await DAL.deleteExperience(experienceID);
                if (deletedExperience) {
                    res.status(200).send(deletedExperience);
                } else {
                    res.status(404).send({ error: 'Experience not found' });
                }
            } catch (error) {
                res.status(500).send({ error: 'Failed to delete experience' });
            }
        } else {
            res.status(400).send({ error: 'Invalid experience ID' });
        }
    }
};
