const app = require('../app');
const Song = require('../entities/song');

const createSong = async (name, artist, genre, album, language, data_ref) => {

    try {
        const song = await Song.create({ name, artist, genre, album, language, data_ref });
        return { status: 201, message: 'Songs created successfully', data: song }
    } catch (error) {
        return { status: 500, message: 'failed to create song. ' + error.message }
    }
};

module.exports = createSong;

