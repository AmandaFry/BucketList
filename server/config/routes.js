var users = require('../controllers/usersController.js');
var bucketList = require('../controllers/bucketListController.js')
// console.log("I am in server, config, routes. Brining in users see bellow:")
// console.dir(users);

module.exports = function(app){
	// console.log('I reached server - config - routes');
	//show the route is typed in and what contorrler to call, example call users.show in users.js
	app.get('/users', function(req, res){
		users.show(req,res);
	});

	app.get('/users/show', function(req, res){
		// console.log('I am in users/show route');
		users.show(req,res);
	});

	//STEP 6 redirecting 
	app.post('/users/create', function(req, res) {
		// console.log('I am in create route');
        users.create(req, res);
    });

	app.get('/users/:id', function(req, res){
		users.showOne(req, res);
	});

	app.get('/bucketList/:id', function(req, res){
     	bucketList.showOne(req, res);
 	});

	app.post('/bucketList/create', function(req, res){
     	bucketList.create(req, res);
 	});

 	app.post('/bucketlist/newList', function(req,res){
 		console.log('I am at the route for newl', req.body);
 		bucketList.newListCreate(req, res);
 	});


//this is test full circle 
 	app.post('/bucketList/testCreate', function(req, res){
 		console.log('I am in server route');
 		bucketList.testCreate(req,res);
 	});
};