
/**
 * Module dependencies.
 */

var express = require('express'),
  spiders = require('./spiders'),
  mongoose = require('mongoose'),
  Product = require('./schemas/product'),
  User = require('./schemas/user'),
  bobamo = require('bobamo');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
//  app.set('views', __dirname + '/views');
//  app.set('view engine', 'jade');
  app.use(express.bodyParser());
      app.use(express.cookieParser());
          app.use(express.session({secret:'super duper secret'}));

  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(bobamo.express({mongoose:mongoose, authModel:User}, express));

});

app.configure('development', function(){
  app.use(bobamo.express({plugin: 'session', uri:'mongodb://localhost/furniture'}));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/spiders', spiders.index);

app.listen(5000);
// console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
