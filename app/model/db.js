var mongoose = require('mongoose'),
    url = 'mongodb://localhost/pinup';
exports.connect = function() {
    mongoose.connect(url);
}
