/*
 * GET home page.
 */

var fs = require('fs');

exports.index = function(req, res){

	var spiders = [];

	fs.readdirSync(__dirname).forEach(function(file) {
	    if (file == "index.js") return;
	    var name = file.substr(0, file.indexOf('.'));
	    spiders.push(name);
	});
  res.render('spiders', { title: 'Express', spiders : spiders })
};