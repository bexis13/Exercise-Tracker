var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//create our url schema
var urlModelSchema = new Schema({
    originalUrl : {type: String},
    shortenedUrl : {type: String}
},
{
    timestamps : true
});


//create our url model --> mongoose will pluralize it
var urlModels = mongoose.model("urlModel", urlModelSchema);

module.exports = urlModels;

