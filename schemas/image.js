var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
    

var ImageSchema = new Schema({
        name        : String
      , description : String
      , url         : String
      , date     : Date
},
{
    display: {
        fieldsets: [
            {
                legend: 'Basic', 
                help: 'Enter basic information of the image',
                fields: [
                    'name', 'description', 'url', 'date'
                ]
            }
        ]
    }
    
}
);



var Image = mongoose.model("image", ImageSchema);
module.exports = Image;
