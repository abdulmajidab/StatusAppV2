const Users = require('./../Model/UsersModel');
const { generateOTP, generateRoomId } = require('./../Utility/HelperFunction');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { phoneNumber, countryCode, countryCallingCode } = req.body;
            const roomId = generateRoomId();
            const otpCode = generateOTP();

            if (!phoneNumber && !countryCode) {
                throw 'Any Field Should Not Be Empty!';
            }

            const users = await Users.findOne({ phoneNumber, countryCode, countryCallingCode });

            if (users && users.length != 0) {
                const user = await Users.findOneAndUpdate({ phoneNumber, countryCode, countryCallingCode }, { otpCode }, { new: true });
                res.status(200).json({
                    success: true,
                    msg: 'Otp has been send.',
                    id: user._id
                })
            } else {
                const user = new Users({ roomId, phoneNumber, countryCode, countryCallingCode, otpCode });
                const u = await user.save()
                res.status(200).json({
                    success: true,
                    msg: 'Otp has been send.',
                    data: u
                })
            }
            next();
        } catch (error) {
            res.status(200).json({
                success: false,
                msg: error instanceof String ? error : error.message
            })
            next();
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { body } = req;
            const _id = body.id;
            delete body.id;
            // console.log(body);
            const user = await Users.findByIdAndUpdate(_id,body,{new:true});
            if (user) {
                res.status(200).json({
                    success: true,
                    msg: 'User profile has been updated.',
                    user: user,
                })
            }
            next();
        } catch (error) {
            res.status(200).json({
                success: false,
                msg: error instanceof String ? error : error.message
            })
            next();
        }
    },
    verifyUser: async (req, res, next) => {
        try {
            const { id,otpCode } = req.body;
            const user = await Users.findOneAndUpdate({ _id:id, otpCode }, { new: true });
            if (user) {
                res.status(200).json({
                    success: true,
                    msg: 'OTP Verified.',
                })
            } else {
                res.status(200).json({
                    success: false,
                    msg: 'Please Confirm OTP!',
                })
            }
            next();
        } catch (error) {
            res.status(200).json({
                success: false,
                msg: error instanceof String ? error : error.message
            })
            next();
        }
    },
    userList: async (req, res, next) => {
        try {
            const users = await Users.find();
            res.status(200).json(users);
            next();
        }catch (error){
            res.json({
                success: false,
                msg: error instanceof String ? error : error.message
            })
            next();
        }
    },
    ressendNumber: async (req, res, next) => {
        try {
            const { phoneNumber} = req.body;
            const roomId = generateRoomId();
            const otpCode = generateOTP();
//            console.log(phoneNumber)

            if (!phoneNumber) {
                throw 'Any Field Should Not Be Empty!';
            }

            const users = await Users.findOne({ phoneNumber});

            if (users && users.length != 0) {
                const user = await Users.findOneAndUpdate({ phoneNumber }, { otpCode }, { new: true });
                res.status(200).json({
                    success: true,
                    msg: 'Otp has been send.',
                    id: user._id
                })
            } 
            next();
        } catch (error) {
            res.status(200).json({
                success: false,
                msg: error instanceof String ? error : error.message
            })
            next();
        }
    },  
}