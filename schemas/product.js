var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
    

var ProductSchema = new Schema({
        name        : String
      , description : String
      , image       : String
      , url         : String
      , date        : Date
},
{
    display: {
        fieldsets: [
            {
                legend: 'Basic', 
                help: 'Enter basic information of the product',
                fields: [
                    'name', 'description', 'image', 'url', 'date'
                ]
            }
        ]
    }
    
}
);



var Product = mongoose.model("product", ProductSchema);
module.exports = Product;
