myApp.factory('userFactory', function($http){
	var factory = {};
    console.log('Loaded factory');

    //it takes in newUser info
	factory.create = function(newUser,callback){
        //STEP4 and 5
        // console.log('create - step2 now in factory create function');
        // console.log('create - step 3 right before ajax call to server');
        
        //This pointing connecting to server /config/routes.js
        $http.post('/users/create',newUser).success(function(data){
            // console.log('create - step4 after server comes back with response/data');
            factory.currentUser = data;
            callback();
        });
    };

    factory.showCurrentUser = function(callback){
        callback(factory.currentUser);
    };

    factory.showAll = function(callback){
        $http.get('/users/show').success(function(data){
            // callback(data);
            // console.log("i am in show all factory")
            callback(data);
        });
    };
        
    factory.logout = function(callback){
        factory.currentUser = {};
        callback(factory.currentUser);
    };

    return factory;
});