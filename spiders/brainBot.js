var nodeio = require('node.io');
var mongoose = require('mongoose');
var Product = require('../schemas/product');

exports.job = new nodeio.Job({max: 1, retries: 1, auto_retry: false, jsdom: true }, {
    input: function (start, num, callback) {
        if (start !== 0) return false; // We only want the input method to run once

        console.log('connecting...');
        
        var conn = mongoose.connect('mongodb://localhost/furniture');
        var self = this;
        
        Product.find({normalizedWidth : {$gte : null}}, function(err, data){
           if(err)
            self.exit(err);

           console.log('found %d matching products', data.length);
           callback(data);
           
        });
            
        // callback(null, false);
        
    },
    run: function (product) {
        console.log('parsing product...', product);
        var self = this;

        self.exit();
    }
});