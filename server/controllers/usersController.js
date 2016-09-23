// SAMPLE CONTROLLER

var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.export = {

	//brings back all the users from db
	show: function(req, res){
		Users.find({}, function(err,data){
			if(err)
				console.log(err);
			else
				res.json(data);

		});
	},

	//brings back just one user from the db
	showOne: function(req, res){
		Users.findOne({_id:req.params.id}, function(err, data){
			if(err)
				console.log(err);
			else
				res,json(data);
		});
	},

	//create a new user
	create: function(req, res){
		//check to see if the user exists
		Users.findOne({name: req.body.name}, function(err, data){
			if(err)
				console.log(err);
			else{ 
				if(data){
					res.jason(data);
				}
				//if the user does not exists create a new one
				else{
					var user = new Users(re.body)
					user.save(function(err){
						if(err)
							conole.log(err);
						else{
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