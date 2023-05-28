const app = require('../../app');
const songService = require('../../services/songService');

module.exports = {
    getSongs: async (req, res) => {
        const query = req.query.query ? req.query.query : '';
        const response = await songService.getSongs(query);
        const { status, ...data } = response;
        return res.status(status).json(data);
    },

    createSong: async (req, res) => {
        const response = await songService.createSong(req);
        return res.status(response.status).json(response.message);
    }
};