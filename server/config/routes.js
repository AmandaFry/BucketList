var users = require('../controllers/usersController.js');
console.log("I am in server, config, routes. Brining in users see bellow:")
console.dir(users);

module.exports = function(app){
	console.log('I reached server - config - routes');
	//show the route is typed in and what contorrler to call, example call users.show in users.js
	app.get('/users', function(req, res){
		users.show(req,res);
	});

	app.get('/users/show', function(req, res){
		console.log('I am in users/show route');
		users.show(req,res);
	});

	app.post('/users/create', function(req, res) {
		console.log('I am in create route');
        users.create(req, res);
    });

	app.get('/users/:id', function(req, res){
		users.showOne(req, res);
	});

};