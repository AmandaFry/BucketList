// require mongoose
var mongoose = require('mongoose');

//USER section
//create the schema for user
var userSchema = new mongoose.Schema({
	//validation, the filed cannot be empty and at least 2 character long in string format
	name: {type:String, required:true, minlength:2}
},{timestamps: true});

//Here where I create Users table
var Users = mongoose.model('Users', userSchema);


//BUCKETLIST section
var Schema = mongoose.Schema;

var listSchema = new mongoose.Schema({
	title: {type:String, required:true, minlength:5},
	description: {type:String, required:true, minlength:10},
	//I refer here the forign key (ID) in user table)
	// owner: {type: Schema.Types.ObjectId, ref: 'Users', required:true},
	ownerl:{type:String, required:true},
	// buddy: {type: Schema.Types.ObjectId, ref: 'Users'},
	buddyl: {type:String},
	done: {type: Boolean, defualt:false},
},{timestamps:true});

//Here where I create bucketLists table
var bucketLists = mongoose.model('bucketList',listSchema)

//Testing steps
var testSchema = new mongoose.Schema({
	name: {type:String, required:true},
	optionalname: {type:String}
},{timestamps:true});

var Test = mongoose.model('test', testSchema)