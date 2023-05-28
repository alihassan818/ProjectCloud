const app = require('../app');
const Playlist = require('../entities/playlist');


const getPlaylist = async (userId) => {
    try {
        const playlist = await Playlist.findOne({ userId });
        console.log('in try');

        if (playlist) {
            return { status: 200, message: 'Playlist found', data: playlist };
        } else {
            const newPlaylist = new Playlist({
                name: 'My Playlist',
                userId,
                songIds: [],
            });

            const result = await newPlaylist.save();
            return { status: 201, message: 'Playlist created and returned', data: result };
        }
    } catch (error) {
        console.log('Error:', error);
        return { status: 500, message: 'Failed to retrieve or create playlist. ' + error.message };
    }
};

module.exports = getPlaylist;
