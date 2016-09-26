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
