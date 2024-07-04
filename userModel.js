const Cloudant = require('@cloudant/cloudant');
const cloudant = Cloudant({ url: process.env.CLOUDANT_URL, username: process.env.CLOUDANT_USERNAME, password: process.env.CLOUDANT_PASSWORD });
const dbName = 'university_dispensary_users';

async function createUser(user) {
    try {
        const response = await cloudant.use(dbName).insert(user);
        return response;
    } catch (err) {
        console.error('Error creating user:', err);
    }
}

async function findUserByUsername(username) {
    try {
        const response = await cloudant.use(dbName).find({ selector: { username } });
        return response.docs[0];
    } catch (err) {
        console.error('Error finding user:', err);
    }
}

module.exports = { createUser, findUserByUsername };
