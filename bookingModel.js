
const Cloudant = require('@cloudant/cloudant');
const cloudant = Cloudant({ url: process.env.CLOUDANT_URL, username: process.env.CLOUDANT_USERNAME, password: process.env.CLOUDANT_PASSWORD });
const dbName = 'university_dispensary_bookings';

async function createBooking(booking) {
    try {
        const response = await cloudant.use(dbName).insert(booking);
        return response;
    } catch (err) {
        console.error('Error creating booking:', err);
    }
}

async function findBookingsByStudent(studentId) {
    try {
        const response = await cloudant.use(dbName).find({ selector: { student: studentId } });
        return response.docs;
    } catch (err) {
        console.error('Error finding bookings:', err);
    }
}

module.exports = { createBooking, findBookingsByStudent };
