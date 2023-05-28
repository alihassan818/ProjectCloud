const app = require('../../app');
const router = app.express.Router();
const conCtrl = require('../controllers/connectivityController');
const validate = require('../middlewares/validatReq');

router.get('/', conCtrl.landingHandler);
router.post('/login', conCtrl.login);
router.get('/logout', conCtrl.logout);
router.get('/songs', validate, conCtrl.songs);
router.get('/create-song', validate, conCtrl.createSongs);
router.post('/store-song', app.upload.single('file'), validate, conCtrl.storeSong);
router.get('/playlist', validate, conCtrl.getPlaylist)
router.get('/to-playlist/:songid', validate, conCtrl.toPlaylist)

module.exports = router;