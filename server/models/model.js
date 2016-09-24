// require mongoose
var mongoose = require('mongoose');


//create the schema for user
var userSchema = new mongoose.Schema({
	//validation, the filed cannot be empty and at least 2 character long in string format
	name: {type:String, required:true, minlength:2}
},{timestamps: true});

//Here where I create Users table
var Users = mongoose.model('Users', userSchema);


var Schema = mongoose.Schema;

var listSchema = new mongoose.Schema({
	title: {type:String, required:true, minlength:5},
	description: {type:String, required:true, minlength:10},
	//I refer here the forign key (ID)in user table)
	owner: {type: Schema.Types.ObjectId, ref: 'Users', required:true},
	done: {type: Boolean },
	buddy: {type: Schema.Types.ObjectId, ref: 'Users'},
},{timestamps:true});

var Lists = mongoose.model('List',listSchema)