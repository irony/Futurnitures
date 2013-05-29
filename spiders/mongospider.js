var nodeio = require('node.io');
var mongoose = require('mongoose');
var Product = require('../schemas/product');

exports.job = new nodeio.Job({max: 5, retries: 1, auto_retry: false, jsdom: true }, {
    
    output : function (products) {
        // console.log('output:', products);

        var self = this;
                
        var conn = mongoose.connect('mongodb://localhost/furniture');
        
        var saved = 0;
            
        products.forEach(function(product){
           var newProduct = new Product(product);
           
           newProduct.date = new Date();
           
           console.log('saving product to DB', newProduct);
           
           newProduct.save(function(err){
              console.log('Saved OK');
              saved++;
              
              if (err){
                console.log('Error: ', err);
                //this.exit(err);
                  
              }
              if (saved >= products.length)
                self.exit();
           });
        });
                
        // this.exit();
        
    }
});