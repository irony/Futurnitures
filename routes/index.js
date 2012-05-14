/*
 * GET home page.
 */

var fs = require('fs');

module.exports = function(app){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        exports[name] = require('./' + name)(app);
    });
}

module.exports.index = function(req, res){
  // console.log(arguments);
  console.log('post', req.body);
  res.render('index', { title: 'Express' })
};