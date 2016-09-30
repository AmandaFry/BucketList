// require path for getting the models path
var path = require('path'); //path get me there

// require the fs module for loading model files
var fs = require('fs');//fs let me communitcate once I am there

// require mongoose
var mongoose = require('mongoose');

// connect to mongoose!
mongoose.connect('mongodb://localhost/BucketList');

// create a variable that points to the path where all of the models live
var models_path = path.join(__dirname, './../models');
//this works too
//var models_path = path.join(__dirname + './../models');

// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
  }
});