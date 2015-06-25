var User = require('../model/user.js');

exports.authenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports.index = function (req, res) {
  User.findById(req.session.passport.user, function (err, user) {
    res.render('evaluators', {user: user});
  });
};

exports.login = function (req, res) {
  res.render('login');
};

exports.loginFailed = function (req, res) {
  res.render('login_fail');
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.evaluators = function (req, res) {
  var evaluators = [
    {
      "name": "1",
      "value": "2"
    },
    {
      "name": "1",
      "value": "2"
    }
  ];
  res.json(evaluators);
};