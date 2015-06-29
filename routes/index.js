var dataStorage = require('../model/data.js');

exports.authenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports.index = function (req, res) {
  dataStorage.User.findById(req.session.passport.user, function (err, user) {
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

exports.newEvaluator = function (req, res) {
  // Parse Data
  var data = req.body;
  // Create a new Evaluator in DataBase
  var response = {
    success: true
  };
  res.send(response);
};

exports.data = function (req, res) {
  var data = {};
  dataStorage.Pipeline.find({}, function (err, pipelines) {
    data.pipelines = pipelines;
    dataStorage.PipelinePhase.find({}, function(err, pipelinePhases) {
      data.pipelinePhases = pipelinePhases;
      dataStorage.Evaluator.find({}, function (err, evaluators) {
        data.evaluators = evaluators;
        dataStorage.EvaluatorPipelinePhase.find({}, function (err, evaluatorPipelinePhases) {
          data.evaluatorPipelinePhases = evaluatorPipelinePhases;
          res.json(data);
        });
      });
    });
  });
};