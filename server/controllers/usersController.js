var mongoose = require('mongoose');
var Users = mongoose.model('Users');
// console.log('I got to usersController - server loaded.');

module.exports = {

	//brings back all the users from db
	show: function(req, res){
		console.log('Server request to show all users')
		Users.find({}, function(err,data){
			if(err)
				console.log(err);
			//if no error then brings back all the data in a json format and put it in data
			else
				res.json(data);	
		});
		//}).sort({name: -1});
			// console.log(data);
	},


	//brings back just one user from the db using id
	showOne: function(req, res){
		Users.findOne({_id:req.params.id}, function(err, data){
			if(err)
				console.log(err);
			else
				res.json(data);
		});
	},
	
	//create a new user
	create: function(req, res){
		// console.log('hit server controller create function');
		//check to see if the user exists by name
		Users.findOne({name: req.body.name}, function(err, data){
			if(err)
				console.log(err);
			else{ 
				if(data){
					console.log('About to send back data to client/browser', data);
					res.json(data);
				}
				//if the user does not exists create a new one
				else{
					var user = new Users(req.body)
					user.save(function(err){
						if(err)
							console.log(err);
						else{
							//bringing back the last created name id
							Users.findOne({}, function(err,data){
								if(err)
									console.log(err)
								else{
									res.json(data);
								}

							}).sort({_id: -1});
						};

					});
				};
			};
		});
	},

}