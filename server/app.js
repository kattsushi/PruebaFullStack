'use strict'
//Cargando Dependencias
var express = require('express');
var path = require('path');
var middleware = require('./middleware');
var config = require('./config');
var logger = require('./logger');
var routes = require('./routes');
var pkg = require('../package.json');
var multer = require('multer');

//Inicializando Express JS
  var app = express();

// Configuracion de Sesiones de usuario
  var secret = config.session && config.session.secret ? config.session.secret : "1234567890QWERTY";
  app.set('session.secret', secret);

//Configuracion passport
//  middleware.passport(passport);

// Configuracion de motor de Vistas HandleBars
  var hbs = require('express-hbs');
  var helpers = require('./helpers');
  app.engine('hbs', hbs.express3({
      partialsDir: path.join(__dirname, 'views/partials')
  }));
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'views'));
  helpers.registerSiteHelpers(hbs);

//Configuracion de morgan
  var morgan = require('morgan');
  app.use(morgan('dev'));

//Configuracion del bodyParser
  var bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cookieParser(config.cookie.secret));

// Inicializador del Validador de Codigo
  var validator = require('express-validator');
  app.use(validator());

// Inicializador de Sesiones
  var session = require('express-session');
  app.use(session({
      secret: secret,
      key: 'app.sid',
      resave: false,
      saveUninitialized: false
  }));

//Configuracion e Inicializador de Passport
  var passport = require('passport');
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(routes.autoLogin); // auto login from token

//Enviar informacion al front.
app.use(function(req, res, next) {
    // Make sure we have a locals value.
    res.locals = res.locals || {};
    res.locals.session = {
        user: req.user
    };
    next();
});


app.use(express.static(path.join(__dirname, '../client/assets')));
// Static assets
app.use('/shared', express.static(path.join(__dirname, '../shared')));
app.use('/vendors', express.static(path.join(__dirname, '../bower_components')));
app.use('/js', express.static(path.join(__dirname, '/../built/scripts')));
app.use('/css', express.static(path.join(__dirname, '/../built/css')));

app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        if (err.status != 404) {
            console.log('request error dev', err ? err.message : err, err ? err.stack : '');
        }
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log('request error dev', err ? err.message : err, err ? err.stack : '');
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
