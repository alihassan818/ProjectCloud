const app = require('../app');
const model = require('../entities/playlist');

const removeSongFromPlaylist = async (userId, songId) => {
    await Playlist.findOneAndUpdate(
        { userId },
        { $pull: { songIds: songId } },
        { new: true }
    )
        .then((playlist) => {
            if (!playlist) {
                return { status: 404, message: 'Playlist not found' };
            }
            return { status: 200, message: 'Song removed from playlist', data: playlist };
        })
        .catch((error) => {
            return { status: 500, message: 'Failed to remove song from playlist' };
        });
}

module.exports = removeSongFromPlaylist;

