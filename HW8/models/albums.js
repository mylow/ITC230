var credentials = require('../lib/credentials.js');
var mongoose = require("mongoose");

 var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }  } };
 mongoose.connect(credentials.mongo.development.connectionString, options);

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

var AlbumSchema = mongoose.Schema({
 title: { type: String, required: true },
 artist: String,
 release: Number,
}); 

module.exports = mongoose.model('Album', AlbumSchema);