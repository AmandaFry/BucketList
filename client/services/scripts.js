console.log('script loaded');
var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']);
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
        .when('/detail',{
            templateUrl: 'partials/detail.html'
        })
        .otherwise({
          redirectTo: '/'
        });
});


myApp.factory('userFactory', function($http){
	var factory = {};
    console.log('Loaded factory');

	factory.create = function(newUser,callback){
        console.log('step2 now in factory create function');
        console.log('step 3 right before ajax call to server');
        $http.post('/users/create',newUser).success(function(data){
            console.log('step4 after server comes back with response/data');
            factory.currentUser = data;
            callback();
        });
    };

    factory.showCurrentUser = function(callback){
        callback(factory.currentUser);
    };

    factory.showAll = function(callback){
        $http.post('/users/show').success(function(data){
            callback(data);
        });
    };

        
    factory.logout = function(callback){
        factory.currentUser = {};
        callback(factory.currentUser);
    };

    return factory;
});


myApp.controller('loginController', function($scope,$location,userFactory){
    console.log(userFactory);
    console.log('loaded controller');
    $scope.login = function(){
        if(!$scope.newUser)
            alert("Name cannot be blank")
        else{
            console.log('step1 someone clicked login');
            userFactory.create($scope.newUser,function(){
                console.log('step 5 controller callback');
                $location.url('/dashboard');
            });
        }
    };
});


myApp.controller('dashboardController', function($scope,$location,userFactory){

    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        console.log('I am in show Current', data)
        if(!data.name)
            $location.url('/');
    });

    userFactory.showAll(function(data){
        $scope.allUsers = data;

    });

    $scope.logout = function(){
        userFactory.logout(function(data){
            $scope.currentUser = data;
            $location.url('/');

        })
    }
});
