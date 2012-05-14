var nodeio = require('node.io');
var mongoose = require('mongoose');        

exports.job = new nodeio.Job({jsdom: true, followAllRedirects: true }, {
    input: false,

    run: function (search_page) {
        var self = this;
        var conn = mongoose.connect('mongodb://localhost/furniture');
        
        var Product = conn.model('Product', require('../schemas/product').product);
        
        Product.find(function(err, products){
            
            if (err || !products)
                self.exit(err);
                
            products.forEach(function(product){
                console.log(product);
                self.emit(product);
            });
            self.exit(err);
            
        });
    }
});