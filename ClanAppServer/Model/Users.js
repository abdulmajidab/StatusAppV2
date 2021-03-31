const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: { type: String, required: false },
    username: { type: String, required: false },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    userImage: { type: String, required: false },
    countryCode: { type: String, required: true },
    otpCode: { type: String, required: true }
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;