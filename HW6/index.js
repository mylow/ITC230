'use strict'

var express = require("express");
var app = express();
var Album = require("./models/albums.js");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/', (req, res, next) => {
    Album.find((err,AlbumSchema) => {
        if(err) return next(err); 
        res.render('home',{Album:JSON.stringify(Album)}); 
    });
});

app.get('/about', (req,res) => {
    res.type('text/html'); 
    res.render('about'); 
}); 

app.get('/api/album/', (req, res) => {
Album.find({}, (err, album) => {
   if (err) return (err);
   res.json(album);
  
 });
});

app.post('/get', (req,res) => {
   Album.find({title:req.body.title}, (err, album) => {
   if (err) return (err);
     res.type('text/html');
     res.render('details', {title:req.body.title,album}); 
 });
});

app.get('/api/album/:title', (req,res,next) => {
  Album.findOne({title:req.params.title.toLowerCase()}, (err, album) => {
   if (err) return next(err);
   res.json(album);
 });
});



app.get('/api/delete/:title', (req,res,next) => { 
Album.remove({title:req.params.title.toLowerCase()}, (err, title) => {
   if (err) return next(err);
   res.json(title);
 
});
});


app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - page not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});