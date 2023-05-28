const app = require('../app');
const Song = require('../entities/song');

const getSongs = async (query) => {
    try {
        const songs = await Song.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { artist: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } },
                { album: { $regex: query, $options: 'i' } },
                { language: { $regex: query, $options: 'i' } },
            ]
        });
        console.log(songs);
        if (songs) {
            return { status: 200, message: 'Songs retrived successfully', data: songs }
        } else {
            return { status: 500, message: 'Unable to retrieve songs. ' + error.message }
        }
    } catch (error) {
        console.error('Error creating query regex:', error);
        return { status: 500, message: 'Unable to retrieve songs. ' + error.message }
    }
};

module.exports = getSongs
