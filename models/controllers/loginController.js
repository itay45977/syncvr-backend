const DAL = require('../DAL');

exports.loginController = {

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await DAL.findUserByUsername(username);
            if (user && user.password === password) {
                res.status(200).send({ message: 'Login successful', user });
            } else {
                res.status(401).send({ error: 'Invalid username or password' });
            }
        } catch (error) {
            res.status(500).send({ error: 'Failed to login' });
        }
    }
};
