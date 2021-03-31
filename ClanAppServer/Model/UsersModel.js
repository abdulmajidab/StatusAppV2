const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    roomId: { type: String, required: true },
    isClanUser: { type: Boolean, default: false, },
    username: { type: String, default: '' },
    email: { type: String, default: '' },
    phoneNumber: { type: String, required: true },
    userImage: { type: String, default: '' },
    countryCode: { type: String, required: true },
    countryCallingCode: { type: String, required: true },
    isActive: { type: Boolean, default: false, },
    isBlock: { type: Boolean, default: false, },
    isReported: { type: Boolean, default: false, },
    unreadMsgCount: { type: Number, default: 0 },
    otpCode: { type: String, required: true }
},
    { timestamps: true, versionKey: false }
);

const Users = mongoose.model('users', UserSchema);

module.exports = Users;