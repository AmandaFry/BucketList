//right after Index - step 2
// console.log('Client, services, script loaded');
var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']); //this is global now


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
