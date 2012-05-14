var nodeio = require('node.io');
var MongoSpider = require('./mongospider').job;

exports.job = MongoSpider.extend({
    input: false,
    run: function (search_page) {
    	var self = this;
	    var product = {};
	    product.name = 'test';
        self.emit([product]);

    }
});