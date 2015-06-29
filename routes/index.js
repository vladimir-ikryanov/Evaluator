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
  var email = req.body.email;
  var firstName = req.body.firstName;
  var notes = req.body.notes;
  var dateTime = req.body.dateTime;

  dataStorage.Evaluator.find({email: email}, function(err, evaluators) {
    if (typeof evaluators !== 'undefined' && evaluators.length > 0) {
      res.send({
        success: false,
        errorMessage: 'Evaluator with the ' + email + ' email is already registered.'
      });
    } else {
      new dataStorage.Evaluator({
        email: email,
        firstName: firstName,
        notes: notes,
        dateTime: dateTime
      }).save(function (err, evaluator) {
          if (err) {
            res.send({
              success: false,
              errorMessage: 'Failed to create a new Evaluator'
            });
          } else {
            var response = {
              success: true,
              evaluator: evaluator
            };
            res.send(response);
          }
        });
    }
  });
};

exports.deleteEvaluator = function (req, res) {
  var evaluatorId = req.body.evaluator._id;
  dataStorage.Evaluator.remove({_id: evaluatorId}, function(err) {
    if (err) {
      res.send({success: false});
    } else {
      dataStorage.EvaluatorPipelinePhase.remove({evaluatorId: evaluatorId}, function(err) {
        res.send({success: !err});
      });
    }
  });
};

exports.data = function (req, res) {
  var data = {};
  dataStorage.Pipeline.find({}, function (err, pipelines) {
    data.pipelines = pipelines;
    dataStorage.PipelinePhase.find({}, function (err, pipelinePhases) {
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