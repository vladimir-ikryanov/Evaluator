var mongoose = require('mongoose');

var Agent = mongoose.model('Agent', {
    email: String,
    superUser: Boolean
});

module.exports = Agent;