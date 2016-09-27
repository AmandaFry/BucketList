myApp.controller('dashboardController', function($scope,$location,userFactory,bucketListFactory){

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


    $scope.logout = function(){
        userFactory.logout(function(data){
            $scope.currentUser = data;
            $location.url('/');

        })
    };


    $scope.newList = function(user){
        console.log(user)
        //other side of the not able to work with hiden value, set the newl.owner ot user.name
        $scope.newl.owner = user.name
        console.log($scope.newl);
         bucketListFactory.newList($scope.newl, function(data){
            console.log('I am in dashboardController - newList calling factory - client');
            $scope.bucketLists = data;
            $location.url('/dashboard');
         });
    };


//THIS is  sample code for me for a full circle of 
    $scope.testCreate = function(){
        //this is the data read in from the dashboard partial, I called the ng-model test. ... 
        console.log($scope.test)
        //when I call the factory I need to pass in the $scope.test to it to pass it to the server
        bucketListFactory.testCreate($scope.test, function(data){
            console.log('I am in dashboardController - test create calling factory - client');
            $scope.test = data;
            $location.url('/dashboard')
        })
    }
//end of full circle

});
