const caseUserLogin = require('../usecases/userLogin');
const caseCreateUser = require('../usecases/createUser');

module.exports = {
    login: async (email, password) => {
        const response = await caseUserLogin(email, password);
        return response;
    },

    createUser: async (email, type) => {
        const response = await caseCreateUser(email, type);
        return response
    },
}