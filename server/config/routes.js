var users = require('../controllers/usersController.js');
console.dir(users);
module.exports = function(app){
	console.log('testing');
	//show the rout is typed in and what contorrler to call, example call users.show in users.js
	app.get('/users', function(req, res){
		users.show(req,res);
	});

	app.post('/users/create', function(req, res) {
		console.log('am i even hitting create route');
        users.create(req, res);
    });

	app.get('/users/:id', function(req, res){
		users.showOne(req, res);
	});

};