const app = require('../../app');

const jwtSecret = app.enviroment.JWT_SECRET_KEY;

function validate(req, res, next) {
    console.log('req in middle', req.body);
    const token = req.cookies['token'];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized.' });
    }

    try {
        const verifiedToken = app.jwt.verify(token, jwtSecret);
        if (!verifiedToken) {
            return res.status(401).json({ success: false, message: 'Unauthorized. Token provided for authentication or authorization appears to have been tampered with or is invalid' });
        }

        req.userId = verifiedToken.user_id;
        req.usertype = verifiedToken.type;
        next();
    } catch (error) {
        console.log(error.message, error);
        return res.status(401).json({ success: false, message: 'Invalid token. ' + error.message });
    }
}

module.exports = validate;