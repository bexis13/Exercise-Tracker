var express = require("express");
var app = express();
var path = require("path");
var mongoose = require("mongoose");
var urlPairModel = require("./models/urls");
var validator = require("validator");

var port = process.env.PORT;

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

app.get("/new/:id(*)", function(request, response){
    
    var originalUrl = request.params.id; //url user typed in
    
    //check if it's a valid url
    if(!validator.isURL(originalUrl)){
        response.send({error: "you can enter only valid urls"})
    }
    //create a shortened url representation
    var shortCode = Math.floor(Math.random()*10000);
    //create new urlpair from url model
    var urlInstance = new urlPairModel({
        originalUrl : originalUrl,
        shortenedUrl : shortCode
    });
    
    //save urlPair data instance in the database
    urlInstance.save(function(err,data){
        if(err){
            console.log(err);
            response.send("Error saving to the database");
        }
        if(data){
            //return back to the user only the original url and shortened form
            console.log(data);
            var appUrl = 'https://bexis-url-shortener.herokuapp.com/';
            response.send({
            originalUrl : originalUrl,
            shortenedUrl : appUrl + shortCode
            });
        }
    })
});

app.get("/:id", function(request, response){
    //get users shortcode
    var shortCode = request.params.id;
    //find document with this shortcode in the database collection urlpairmodel
    urlPairModel.findOne({'shortenedUrl':shortCode}, function(err, docs){
        if(err){
            response.send("cannot find your shortUrl in database. Please add it" +
        " as new url /new/your_url_here");
        }
        if(docs){
            console.log(docs.originalUrl);
            //check if docs original url does not have http in it
            var check = docs["originalUrl"].substring(0,4);
            //add http if it does not have
            if(check !== "http"){
                var urlToVisit = "http://" + docs.originalUrl;
                response.redirect(urlToVisit);
            }
            //it has http, so:
            //redirect user to appropriate url representation of the shortcode
            response.redirect(docs.originalUrl);
        }
        else if(!docs){
            response.send({error: "cannot find your shortened url in database."
                + " Please create it as a new one"})
        }
    })
})

app.listen(port, function(){
    console.log("app is listening on port");
})