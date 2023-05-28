const app = require('../app');
const jwtSecret = app.environment.JWT_SECRET_KEY;

const userSchema = new app.mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    type: { type: String }
});

const userModel = app.mongoose.model('User', userSchema);

module.exports = {
    userModel,
    generateToken: (payload) => { return app.jwt.sign(payload, jwtSecret) }
};
