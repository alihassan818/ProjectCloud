const app = require('../app');
const user = require('../entities/user');

const createUser = async (email, type) => {
    const userCheck = await user.userModel.findOne({ email });
    if (userCheck) {
        return { status: 409, message: 'Email already exists' };
    }

    const salt = await app.bcrypt.genSalt(parseInt(5));
    const hashedPassword = await app.bcrypt.hash('root1234', salt);
    const name = 'test-' + type;

    try {
        const newUser = new user.userModel({ email, password: hashedPassword, name, type });
        savedUser = await newUser.save();
        return { status: 201, message: 'User created successfully' };
    } catch (error) {
        return { status: 500, message: 'Something went wrong' };
    }
}

module.exports = createUser
