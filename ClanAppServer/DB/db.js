const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/clan';

function db() {
    mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify:false,
    }).then(() => {
        console.log('Database Is Connected!!');
    }).catch(() => {
        console.log('Database Is Not Connected!!');
    })
}

module.exports = db;


