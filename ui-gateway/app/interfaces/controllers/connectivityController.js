const app = require('../../app');

module.exports = {
    landingHandler: (req, res) => {
        if (getTokenCookie(req)) {
            res.redirect('/songs');
        }
        res.render('landing-page');
    },

    login: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        app.axios.post(`${app.enviroment.LOGIN_SERVICE}/login`, { email, password }).then((response) => {
            if (response.status === 200) {
                res.cookie('token', response.data.token);
                res.redirect('/songs');
            }
            else {
                req.flash('error', 'Authentication failed. ' + response.data.message);
                res.redirect('back');
            }
        }).catch((err) => {
            req.flash('error', 'Authentication failed. ' + err.response.data.message);
            res.redirect('back');
        });;

    },

    logout: (req, res) => {
        res.clearCookie('token');
        req.flash('success', 'Successfully logged out, loggin again to continue');
        res.redirect('/');
    },

    songs: (req, res) => {
        let search = req.query.search ? req.query.search : '';
        const params = {
            query: search
        }
        const headers = {
            authorization: getTokenCookie(req)
        };
        let songs = [];
        app.axios.get(`${app.enviroment.SONG_SERVICE}/getsongs`, { params, headers }).then((response) => {
            data = response.data;
            req.flash('success', data.message);
            res.render('songs', { songs: data.data, search: search });
        }).catch((err) => {
            req.flash('error', 'Failed to get songs. ');
        });
    },

    createSongs: (req, res) => {
        res.render('create-song-form');
    },
    storeSong: async (req, res) => {
        console.log(req.file);
        const { name, genre, artist, album, language } = req.body;
        const file = req.file;
        if (file === undefined) {
            req.flash('error', 'No file uploaded');
            return res.redirect('/create-song');
        }
        const fileExtension = app.path.extname(file.originalname);
        const fileName = `${name}${fileExtension}`;
        const filePath = app.path.join('storage', 'songs', fileName);
        const storageDirectory = app.path.join('storage', 'songs');
        if (!app.fs.existsSync(storageDirectory)) {
            app.fs.mkdirSync(storageDirectory, { recursive: true });
        }
        // const fileUrl = `${req.protocol}://${req.get('host')}/${file.path}`;
        try {
            app.fs.renameSync(file.path, filePath);
            const currentUrl = req.protocol + '://' + req.get('host');
            const fileUrl = `${currentUrl}/${filePath.replace('\\', '/')}`;
            const params = {
                name: name,
                artist: genre,
                genre: artist,
                album: album,
                language: language,
                data_ref: fileUrl
            };
            const headers = {
                authorization: getTokenCookie(req)
            };
            const response = await app.axios.post(`${app.enviroment.SONG_SERVICE}/createsong`, params, { headers });
            console.log(response);
            req.flash('success', response.message);
            res.redirect('/songs');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                req.flash('error', err.response.data.error);
                res.redirect('/create-song');
            } else {
                req.flash('error', err.message);
                res.redirect('/create-song');
            }
        }
    },

    getPlaylist: async (req, res) => {

        let search = req.query.search ? req.query.search : '';
        const params = {
            query: search
        }
        const headers = {
            authorization: getTokenCookie(req)
        };
        let songs = [];
        try {
            const response = await app.axios.get(`${app.enviroment.SONG_SERVICE}/getsongs`, { params, headers });
            console.log(response);
            songs = response.data.data;

        } catch (error) {

            req.flash('error', 'Failed to get songs. ');
        }


        try {
            const headers = {
                authorization: getTokenCookie(req)
            };
            const response = await app.axios.get(`${app.enviroment.PLAYLIST_SERVICE}/getPlaylist`, { headers });
            if (response.status === 200) {
                playlist = response.data.data;
                playlist = playlistSongs(playlist, songs);

            } else {
                req.flash('error', 'No playlist found');
            }
            res.render('playlist', { playlist: playlist });
        } catch (error) {
            console.log('failed to get the playlist:' + error);
            req.flash('error', 'Failed to load playlist');
        }
    },
    toPlaylist: (req, res) => {
        const params = {
            songId: req.params.songid
        };
        const headers = {
            authorization: getTokenCookie(req)
        };
        app.axios.post(`${app.enviroment.PLAYLIST_SERVICE}/addsong`, params, { headers }).then((result) => {
            req.flash('success', 'Song added to playlist');
            res.redirect('/songs');
        }).catch((err) => {
            console.log(err.message, err);
            req.flash('error', 'Error adding song to playlist');
            res.redirect('/songs');
        });
    }

};

function getTokenCookie(request) {
    const token = request.cookies['token'];
    if (token === undefined) {
        return false;
    }
    return 'Bearer ' + token;
}

function playlistSongs(playlist, songs) {
    const updatedSongs = playlist.songIds.map(songId =>
        songs.find(song => song._id === songId)
    );

    return {
        ...playlist,
        songIds: updatedSongs,
    }
}