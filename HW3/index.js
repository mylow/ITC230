'use strict'

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

app.get('/', (req, res) => {
 res.type('text/html');
 res.sendFile(__dirname + '/public/home.html'); 
});

app.get('/home', (req, res) => {
 res.type('text/html');
 res.sendFile(__dirname + '/public/home.html'); 
});

app.get('/details', (req, res) => {
 res.type('text/html');
 res.sendFile(__dirname + '/views/details.html'); 
});

app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('About page');
});

app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('Error 404: page does not exist');
});

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");




app.listen(app.get('port'), () => {
 console.log('Express started'); 
});