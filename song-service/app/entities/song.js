const app = require('../app');

const songSchema = new app.mongoose.Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    album: { type: String, required: true },
    language: { type: String, required: true },
    data_ref: { type: String, required: true },
});

const Song = app.mongoose.model('Song', songSchema);

module.exports = Song;

