var User = require('../user.js');

exports.authenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

exports.index = function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.render('evaluators', {user: user});
        }
    });
};

exports.login = function (req, res) {
    res.render('login');
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};