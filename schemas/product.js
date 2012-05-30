var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
  
var Image = require('./image');
    

var ProductSchema = new Schema({
        name        : String
      , description : { type: String, display: {dataType:'String', type: 'TextArea'}}
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
      , images      : [{ type:Schema.ObjectId, ref:'image'}]
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
            },
            {
                legend: 'Dimensions', 
                help: 'Width and height etc',
                fields: [
                    'width', 'height', 'length', 'url', 'date'
                ]
            },
            {
                legend: 'Design', 
                help: 'Materials, form and finish',
                fields: [
                    'material', 'form', 'finish', 'designer', 'images'
                ]
            }

        ]
    }
    
}
);



var Product = mongoose.model("product", ProductSchema);
module.exports = Product;
