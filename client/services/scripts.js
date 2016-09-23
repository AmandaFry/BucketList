var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']);

//this is how to navigate between partials
myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl: 'partials/login.html',
        })
        .when('/dashboard',{
            templateUrl: 'partials/dashboard.html'
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

	factory.create = function(newUser,callback){
        $http.post('/users/create',newUser).success(function(data){
            factory.currentUser = data;
            callback();
        });
    };

    factory.showCurrentUser = function(callback){
        callback(factory.currentUser);
    };

    factory.logout = function(callback){
        factory.currentUser = {};
        callback(factory.currentUser);
    };

	return factory
});


myApp.controller('loginController', function($scope,$location,userFactory){
    $scope.login = function(){
        if(!$scope.newUser)
            alert("Name cannot be blank")
        else{
            userFactory.create($scope.newUser,function(){
                $location.url('/dashboard');
            });
        }
    };
});


myApp.controller('dashboardController', function($scope,$location,userFactory){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(!data.name)
            $location.url('/');
    });

    $scope.logout = function(){
        userFactory.logout(function(data){
            $scope.currentUser = data;
            $location.url('/');
        })
    }
});


