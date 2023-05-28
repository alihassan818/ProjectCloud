const app = require('../../app');
const router = app.express.Router();
const playlistController = require('../controllers/playlistController');
const validate = require('../middlewares/validatReq');

router.get('/getPlaylist', validate, playlistController.getPlaylist);
router.post('/addsong', validate, playlistController.addSongs);
router.post('/removesong', validate, playlistController.removeSongs);

module.exports = router;