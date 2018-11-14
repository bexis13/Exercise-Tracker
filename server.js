var express = require("express");
var app = express();
var path = require("path");
var mongoose = require("mongoose");
var userModel = require("./models/user");
var validator = require("validator");
var bodyParser = require("body-parser");
var cors = require("cors");

var port = process.env.PORT;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

//connect to the database
var mlabUrl = process.env.MONGOLAB_URI; /*get mlab url(credentials) from environment variables and url-shortner is dbname*/
mongoose.Promise = global.Promise;
mongoose.connect(mlabUrl ||"mongodb://localhost:27017/urlShortener"); /*connect to mongodb(on mlab, no locally) with mongoose
either on mlab cloud remote database or locally installed mongodb*/

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'))
connection.on('open', function(){
    console.log("connected correctly to the database");
})

app.post("/api/exercise/new-user", function(request, response){
    
    //get username from user form
    var userName = request.body.username;
    
    //create a userId
    var userId = Math.floor(Math.random()*10000);
    
    //create new user model
    var userInstance = new userModel({
        userName : userName,
        id : userId
    });
    
    //save new user data instance in the database
    userInstance.save(function(err,data){
        if(err){
            console.log(err);
            response.send("Error saving to the database");
        }
        if(data){
            //return back to the user only the original url and shortened form
            console.log(data);
            response.send({
            userName : userName,
            id : userId
            });
        }
    })
});

app.post("/api/exercise/add", function(request, response){
    //get user id
    var userId = request.body.id;
    //find document with this userId in the database collection usermodel
    userModel.findOne({'userId':userId}, function(err, docs){
        if(err){
            response.send("cannot find this username in the database. Please"
            +" create a new user to add exercises");
        }
        if(docs){
            
            //update the users count and log
            
            //send user his details
            response.send({ 
                "id": docs.id,
                "username": docs.userName,
                "count": docs.count,
                "log": docs.log
            });
        }
    })
})

app.listen(port, function(){
    console.log("app is listening on port");
})