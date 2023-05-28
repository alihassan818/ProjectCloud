const { query } = require('express');
const app = require('../../app');
const router = app.express.Router();

router.get('/', (req, res) => {
    return res.status(200).json('Services operational');
});
router.post('/login', async (req, res) => {
    const params = req.body;
    console.log(params);
    await app.axios.post(`${app.environment.USER_SERVICE}/login`, params)
        .then((response) => {
            return res.status(200).json(response.data);
        }).catch((error) => {
            if (error.response.status === 401) {
                return res.status(401).json({ error: error.response.data.message });
            }
            return res.status(500).json({ error: 'Login failed. ' + error.message });
        });
});
router.get('/create', async (req, res) => {
    const queryAdmin = {
        email: 'admin@dev.com',
        type: 'operator'
    }
    const queryUser = {
        email: 'user@dev.com',
        type: 'user'
    }
    try {
        const userAdmin = await app.axios.get(`${app.environment.USER_SERVICE}/create`, { queryAdmin });
        const userUser = await app.axios.get(`${app.environment.USER_SERVICE}/create`, { queryUser });
        return { true: true };
    } catch (error) {
        return { true: false };
        console.log(error);
    }

});

module.exports = router;