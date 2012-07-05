var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var image = require('./image');
var swedishColorParser = require('./../swedishColors');

  
var ProductSchema = new Schema({
       name        : String,
       description : { type: String, display: {dataType:'String', type: 'TextArea'}},
       image       : String,
       price       : String,
       url         : String,
       width       : String,
       length      : String,
       height      : String,
       form        : String,
       color       : String,
       finish      : String,
       material    : String,
       articleNumber : String,
       designer    : String,
       source      : String,
       images      : [{ type: String}],
       normalizedWidth : String,
       normalizedHeight  : String,
       normalizedForm : String,
       normalizedColorR : String,
       normalizedColorG : String,
       normalizedColorB : String,
       date        : Date,
       updated     : Date
},
{
    display: {
        fieldsets: [
            {
                legend: 'Basic',
                help: 'Enter basic information of the product',
                fields: [
                    'name', 'description', 'image', 'url', 'date', 'price'
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
            },
            {
                legend: 'Neural Network',
                help: 'Normalized fields used in neural network',
                fields: [
                    'normalizedWidth', 'normalizedHeight', 'normalizedColorR', 'normalizedColorG', 'normalizedColorB', 'normalizedForm'
                ]
            }

        ]
    }
    
}
);

ProductSchema.pre('save', function (next) {

    var self = this;

    if (this.width)
      this.normalizedWidth = Math.min(parseInt(this.width, 10) / 300, 1);
    
    if (this.height)
      this.normalizedHeight = Math.min(parseInt(this.height, 10) / 300, 1);
  
    if (this.form)
    {
      switch (this.form.toLowerCase()){
        case 'rak' : this.normalizedForm = 0; break;
        case 'rektangulär' : this.normalizedForm = 0; break;
        case 'kon' : this.normalizedForm = 0.3; break;
        case 'oval' : this.normalizedForm = 0.9; break;
        case 'rund' : this.normalizedForm = 1; break;
        case 'halvmåne' : this.normalizedForm = 0.5; break;
        case 'svängd' : this.normalizedForm = 0.8; break;
      }
    }

    if (this.color)
    {
      console.log('color', this.color);

      var color = swedishColorParser(this.color.toLowerCase());

      if (color){
        this.normalizedColorR = color.red / 255;
        this.normalizedColorG = color.green / 255;
        this.normalizedColorB = color.blue / 255;
      }
    }

    next();
});




var Product = mongoose.model("product", ProductSchema);



module.exports = Product;
