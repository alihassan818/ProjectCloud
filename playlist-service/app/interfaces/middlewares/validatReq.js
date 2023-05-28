const app = require('../../app');

const jwtSecret = app.environment.JWT_SECRET_KEY;

function validate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized.' });
    }

    try {
        const verifiedToken = app.jwt.verify(token, jwtSecret);
        console.log(verifiedToken);
        if (!verifiedToken) {
            return res.status(401).json({ success: false, message: 'Unauthorized. Token provided for authentication or authorization appears to have been tampered with or is invalid' });
        }

        req.userId = verifiedToken.user_id;
        req.usertype = verifiedToken.type;
        next();
    } catch (error) {
        console.log(error.message, error);
        return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
}

module.exports = validate;