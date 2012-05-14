var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
    

exports.product = new Schema({
        name        : String
      , description : String
      , image       : String
      , url         : String
      , date        : Date
});
