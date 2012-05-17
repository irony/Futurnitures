var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
    

var ProductSchema = new Schema({
        name        : String
      , description : String
      , image       : String
      , url         : String
      , width       : String
      , length      : String
      , height      : String
      , form        : String
      , color       : String
      , finish      : String
      , material    : String
      , articleNumber : String
      , designer    : String
      , source      : String
      , date        : Date
      , updated     : Date
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
