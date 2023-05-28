const app = require('../../app');
const router = app.express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.get('/create', userController.createUser);

module.exports = router;