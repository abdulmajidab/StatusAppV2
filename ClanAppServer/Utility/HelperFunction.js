const { v4: uuidV4 } = require('uuid');

module.exports = {
    generateOTP: () => {
        var digits = '0123456789';
        var optLength = 6
        var otp = '';
        for (let i = 1; i <= optLength; i++) {
            var index = parseInt(Math.random() * 10);
            otp += digits[index];
        }
        return otp;
    },
    generateRoomId: () => {
        return uuidV4();
    }
}