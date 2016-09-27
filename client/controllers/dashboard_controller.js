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

    $scope.testCreate = function(){
        //this is the data read in from the dashboard partial
        console.log($scope.test)
        //when I call the factory I need to pass in the $scope.test to it to pass it to the server
        bucketListFactory.testCreate($scope.test, function(data){
            console.log('I am in dashboardController - test create calling factory - client');
            $scope.test = data;
            $location.url('/dashboard')
        })
    }


});
