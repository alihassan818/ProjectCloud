const caseAddSongInPlaylist = require('../usecases/addSongInPlaylist');
const caseRemoveSongInPlaylist = require('../usecases/removeSongInPlaylist');
const caseGetPlaylist = require('../usecases/getPlaylist');


module.exports = {
    getPlaylist: async (userId) => {
        const response = await caseGetPlaylist(userId);
        console.log('response from use case', response);
        return response;
    },

    addSongInPlaylist: async (userId, songId) => {
        const response = await caseAddSongInPlaylist(userId, songId);
        return response;
    },

    removeSongInPlaylist: async (userId, songId) => {
        const response = await caseRemoveSongInPlaylist(userId, songId);
        return response
    },
}