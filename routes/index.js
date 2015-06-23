var User = require('../model/user.js');
var Agent = require('../model/agent.js');

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

exports.agents = function (req, res) {
    Agent.find(function(err, agents) {
        res.render('agents', {agents: agents});
    });
};

exports.newAgent = function (req, res) {
    var agentEmail = req.body.email;
    Agent.findOne({email: agentEmail}, function(err, agent) {
       if (!err && agent == null) {
           Agent.create({email: agentEmail, superUser: false}, function(err, agent) {
              if (err) {
                  console.error(err);
              } else {
                  console.log('Agent has been added: ' + agentEmail);
                  res.redirect('/agents');
              }
           });
       } else {
           res.redirect('/agents');
       }
    });
};

exports.deleteAgent = function (req, res) {
    var agentId = req.body.id;
    Agent.remove({_id: agentId}, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Agent has been removed: ' + agentId);
        }
    });
};