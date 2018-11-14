var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//create our user schema
var userModelSchema = new Schema({
    id : {type: String},
    username : {type: String},
    count : {type : Number},
    log: {type : Array}
},
{
    timestamps : true
});


//create our user model --> mongoose will pluralize it
var userModels = mongoose.model("userModel", userModelSchema);

module.exports = userModels;

