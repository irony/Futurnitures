var nodeio = require('node.io');
var mongoose = require('mongoose');
var Product = require('../schemas/product');

exports.job = new nodeio.Job({max: 1, retries: 1, auto_retry: false, jsdom: true }, {
    input: function (start, num, callback) {
        if (start !== 0) return false; // We only want the input method to run once

        console.log('connecting...');
        
        var conn = mongoose.connect('mongodb://localhost/furniture');
        var self = this;
        
        Product.find({'url' : { $ne: null}, 'updated' : null}, function(err, data){
            
           console.log('found %d matching products', data.length);
           callback(data); 
           
        });
        
        
            
        // callback(null, false);

        
    },

    run: function (product) {
        console.log('parsing %s products...', product.name);
        
        var self = this;

        console.log('getting product..', product);
        self.getHtml(product.url, function(err, $, output){
            
            var key = '';
            
            $(".articleSpecs tr td").each(function(){
                var value = $(this).html().trim();
                
                if (value.endsWith(':')) // längd: or bredd:
                {
                    key = value;
                }
                else
                {
                    switch(key){
                        case 'Längd:': product.length = value; break;
                        case 'Bredd:': product.width = value; break;
                        case 'Höjd:': product.height = value; break;
                        case 'Form:': product.form = value; break;
                        case 'Färg:': product.color = value; break;
                        case 'Behandling:': product.finish = value; break;
                        case 'Kärnmaterial:': product.material = value; break;
                        case 'Formgivare / Designer:': product.designer = value; break;
                        case 'Artikelnr:': product.articleNumber = value; break;
                        default:                     
                            product[name] = item;
                        break;

                    }
                    
                }
            });
            
            product.updated = Date();
            product.save();
            
            self.emit(product);
            
            self.exit(); // remove later
        });
        
        //self.exit();     
    }
});

String.prototype.endsWith = function(suffix) {
    return this.match(suffix + "$") == suffix;
}
