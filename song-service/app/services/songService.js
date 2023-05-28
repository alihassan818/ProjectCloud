const caseCreateSong = require('../usecases/createSong');
const caseGetSongs = require('../usecases/getSongs');

module.exports = {
    getSongs: async (search) => {
        const response = await caseGetSongs(search);
        console.log('response in song service', response);
        return response;
    },

    createSong: async (req) => {
        console.log('req in songservice', req);
        const { name, artist, genre, album, language, data_ref } = req.body;
        const response = await caseCreateSong(name, artist, genre, album, language, data_ref);
        return response
    },
}