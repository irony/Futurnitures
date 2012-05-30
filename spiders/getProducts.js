var nodeio = require('node.io');
var mongoose = require('mongoose');        
var Product = require('../schemas/product');

exports.job = new nodeio.Job({jsdom: true, followAllRedirects: true }, {
    input: false,

    run: function (search_page) {
        var self = this;

        var conn = mongoose.connect('mongodb://localhost/furniture');

        Product.find({updated : {$gt : new Date()}}, {tailable:true}, function(err, cursor){
          if (err){
            return console.log(err) 
          }
        
          cursor.forEach(function(err, doc){
            // do stuff to doc
            self.emit(doc);
          });
        });
    }
});