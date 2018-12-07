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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

//connect to the database
var mlabUrl = process.env.MONGOLAB_URI; /*get mlab url(credentials) from environment variables and url-shortner is dbname*/
mongoose.Promise = global.Promise;
mongoose.connect(mlabUrl ||"mongodb://localhost:27017/exerciseTracker"); /*connect to mongodb(on mlab, no locally) with mongoose
either on mlab cloud remote database or locally installed mongodb*/

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'))
connection.on('open', function(){
    console.log("connected correctly to the database");
})

app.post("/api/exercise/new-user", function(request, response){
    
    //get username from user form
    var userName = request.body.username;
    
    
    
    //create new user model
    var userInstance = new userModel({
        username : userName,
        count : 0,
        log : []
    });
    
    //save new user data instance in the database
    userInstance.save(function(err,data){
        if(err){
            console.log(err);
            response.send("Error saving to the database");
        }
        if(data){
            //show user data
            response.send({
            userName : userName,
            id : data._id
            });
        }
    })
});

app.post("/api/exercise/add", function(request, response){
    //get user id
    var userId = request.body.userId;
    var newLog = {
        "description" : request.body.description,
        "duration" : request.body.duration,
        "date" : request.body.date
    }
    //find document with this userId in the database collection usermodel
    userModel.findOneAndUpdate({'_id':userId},
    {$inc:{count: 1}, $push:{log: newLog }}, {new: true}, function(err, docs){
        if(err){
            response.send("cannot find this user Id in the database. Please"
            +" create a new user to add exercises");
        }
        if(docs){
            
            //send user details back
            response.send({ 
                "username" : docs.username,
                "description" :request.body.description,
                "duration" : request.body.duration,
                "id": docs._id,
                "date": request.body.date
            });
        }
    })
})

app.get("/api/exercise/log?", function(request, response){
    //get user id
    var userId = request.query.userId;
    //find document with this user id in the database collection userModel
    userModel.findOne({_id : userId}, function(err, docs){
        if(err){
            response.send("cannot find your userId in database.");
        }
        else if(docs){
            
            //check for optional parameters in user query
            if(request.query.from){
                
            }
            response.send({
                "id" : docs._id,
                "username" : docs.username,
                "count" : docs.count,
                "log" : docs.log
            });
        }
        else{
            response.send({"error": "cannot find your userId in database."
                + " Please create a new user"});
        }
    });
});

app.listen(port, function(){
    console.log("app is listening on port");
})