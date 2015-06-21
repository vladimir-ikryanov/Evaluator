var mongoose = require('mongoose');

var User = mongoose.model('User', {
    oauthID: Number,
    name: String
});

module.exports = User;