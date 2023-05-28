const app = require('../../app');
const router = app.express.Router();
const songController = require('../controllers/songController');

router.get('/getsongs', songController.getSongs);
router.post('/createsong', songController.createSong);

module.exports = router;