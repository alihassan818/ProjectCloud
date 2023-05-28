const app = require('../../app');
const userService = require('../../services/userService');

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const response = await userService.login(email, password);
        const { status, ...data } = response;
        return res.status(status).json(data);
    },

    createUser: async (req, res) => {
        const { email, type } = req.query;
        const response = await userService.createUser(email, type);
        return res.status(response.status).json(response.message);
    }
};