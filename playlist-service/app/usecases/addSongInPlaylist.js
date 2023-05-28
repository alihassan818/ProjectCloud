const app = require('../app');
const model = require('../entities/playlist');

const addSongInPlaylist = async (userId, songId) => {
    try {
        const playlist = await model.findOneAndUpdate(
            { userId },
            { $push: { songIds: songId } },
            { new: true }
        );

        if (!playlist) {
            return { status: 404, message: 'Failed to save song in playlist' };
        }

        return { status: 200, message: 'Song included in playlist successfully', data: playlist };
    } catch (error) {
        console.log('error in add song in playlist usecase', error);
        return { status: 500, message: 'Failed to save song in playlist' };
    }
};

module.exports = addSongInPlaylist;

