var nodeio = require('node.io');
var mongoose = require('mongoose');
var Product = require('../schemas/product');
var Image = require('../schemas/image');

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
            
            if (err){
                self.skip();
                return;
            }
            
            console.log(err);
            
            var key = '';
            
            
            $(".articleSpecs tr td").each(function(){
                var value = $(this).html().trim();
                
                if (value.endsWith(':')) // längd: or bredd:
                {
                    key = value;
                }
                else // every second time it is the key and otherwise its the value ie. <td>key:</td><td>value</td>
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
                            product[key] = value;
                        break;

                    }
                    
                }
            });
            
            product.description = $('.articleDescription p').text();
            
            product.images = [];
            
            if ($('.articleSidebar img')){
                
                $('.articleSidebar img').each(function(){
                    
                    var src =$(this).attr('src');
                    
                    var image = new Image({url: src});
                    
                    console.log(image);

                    product.images.push(image);
                });
            }
            
            product.updated = Date();
    
            console.log('saving..');
                
            product.save(function(){
                console.log('save OK');
                self.emit(product);
            });
            
        });
        
        self.exit();     
    }
});

String.prototype.endsWith = function(suffix) {
    return this.match(suffix + "$") == suffix;
}
