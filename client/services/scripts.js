console.log('Client, services, script loaded');
var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']);


//this is how to navigate between partials
myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl: 'partials/login.html',
        })
        .when('/dashboard',{
            templateUrl: 'partials/dashboard.html',
            //if I dond't have controller info then I need to add this to the partial
            conrtoller: 'dashboardController'
        })
        .when('/detail/:id',{
            templateUrl: 'partials/detail.html'
        })
        .otherwise({
          redirectTo: '/'
        });
});


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


myApp.factory('listFactory', function($http){
    var factory = {};

    console.log('am in in listFacory showOne')
    factory.showOne = function(user, callback){
        $http.get('/detail/'+user._id).success(function(data){
            factory.bucketList = data;
            callback();
        });
    };

    // factory.showOne = function(poll,callback){
    //     $http.get('/polls/'+poll._id).success(function(data){
    //         factory.currentPoll = data;
    //         callback();
    //     });
    // };

    return factory;
});

myApp.controller('loginController', function($scope,$location,userFactory){
    console.log(userFactory);
    // console.log('loaded loginController');

    //STEP 2 this is login() fucntion
    $scope.login = function(){
        //if not entered a name it will give an alert that you must enter one
        if(!$scope.newUser)
            alert("Name cannot be blank")
        else{
            //STEP 3 read in newUser from input it pass it to userFactory.create
            // console.log('create - step1 someone clicked login');
            userFactory.create($scope.newUser,function(){
                // console.log('step 5 controller callback');
                $location.url('/dashboard');
            });
        }
    };
});


myApp.controller('dashboardController', function($scope,$location,userFactory){

    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        // console.log('I am in show Current', data)
        if(!data.name)
            $location.url('/');
    });

    userFactory.showAll(function(data){
        //here where I tied the partial allUsers
        $scope.allUsers = data;
        console.log("I am in client, dashboardController inside showAll")
        console.log(data)
    });

    $scope.showOne = function(user){
        listFactory.showOne(user, function(){
            $location.url('/detail/'+ user._id);
        });
    };


    // $scope.showOne = function(poll){
    //     pollFactory.showOne(poll,function(){
    //         $location.url('/polls/'+poll._id);
    //     });
    // };

    $scope.logout = function(){
        userFactory.logout(function(data){
            $scope.currentUser = data;
            $location.url('/');

        })
    };


});
