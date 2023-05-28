const app = require('../app');
const model = require('../entities/user');

const userLogin = async (email, password) => {
    const user = await model.userModel.findOne({ email });
    if (!user) {
        return { status: 401, message: 'User dont exist, please recheck your email' };
    }
    const passwordCheck = await app.bcrypt.compare(password, user.password);
    if (!passwordCheck) {
        return { status: 401, message: 'Invalid password, you have entered an invalid password' };
    }
    const token = model.generateToken({
        user_id: user._id.toString(),
        email: user.email,
        name: user.name,
        type: user.type
    });
    return { status: 200, message: 'Logged in successfully', token: token }

}

module.exports = userLogin;

