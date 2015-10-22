var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  name:String ,
  year: String,
  genre: String,
  comments: [{
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    body:String,
    rating:String
  }]
});


mongoose.model('Movie', MovieSchema);
