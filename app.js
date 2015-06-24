var fs = require('fs');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var session = require('express-session');
var methodOverride = require('method-override');
var passport = require('passport');
var passportStrategyGoogle = require('passport-google-oauth').OAuth2Strategy;
var User = require('./model/user.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authentication');

var settings = JSON.parse(fs.readFileSync('data/settings.json', 'utf8'));

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        console.log(user);
        if (err) {
            done(err, null);
        } else {
            done(null, user);
        }
    });
});
passport.use(new passportStrategyGoogle({
        clientID: '289310818632-ts637th23cmjfquvofpu0a4kjnrd4m8v.apps.googleusercontent.com',
        clientSecret: 'aDe9s7WO2H7RSPmcIzgwREW-',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        // Check if profile's email match the one from registered emails
        var isProfileEmailRegistered = false;
        profile.emails.forEach(function (item) {
            // item.value => email
            if (settings.emails.indexOf(item.value) != -1) {
                isProfileEmailRegistered = true;
            }
        });
        if (isProfileEmailRegistered) {
            User.findOne({oauthID: profile.id}, function (err, user) {
                if (!err && user != null) {
                    return done(null, user);
                }
                User.create({oauthID: profile.id, name: profile.displayName}, function (err, user) {
                    if (err) {
                        console.error(err);
                    } else {
                        done(null, user);
                    }
                });
            });
        } else {
            done(null, false);
        }
    }
));

app.get('/', routes.authenticated, routes.index);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/auth/google', passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
}));
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;