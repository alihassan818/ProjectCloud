const app = require('../../app');
const playlistService = require('../../services/playlistService');

module.exports = {
    getPlaylist: async (req, res) => {
        const userId = req.userId;
        const response = await playlistService.getPlaylist(userId);
        console.log('response from song serivce', response);
        const { status, ...data } = response;
        return res.status(status).json(data);
    },

    addSongs: async (req, res) => {
        const userId = req.userId;
        const { songId } = req.body;
        const response = await playlistService.addSongInPlaylist(userId, songId);
        return res.status(response.status).json(response.message);
    },

    removeSongs: async (req, res) => {
        const userId = req.userId;
        const { songId } = req.body;
        const response = await playlistService.removeSongInPlaylist(userId, songId);
        return res.status(response.status).json(response.message);
    }

};