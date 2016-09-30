myApp.controller('dashboardController', function($scope,$location,userFactory,bucketListFactory){
    //USER SECTION
    //brings back the current user as the page load
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        // console.log('I am in show Current', data)
        if(!data.name)
            $location.url('/');
    });

    //brings back all the users at page load
    userFactory.showAll(function(data){
        //here where I tied the partial allUsers
        $scope.allUsers = data;
        // console.log("I am in client, dashboardController inside showAll")
        // console.log(data)
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



    //Brings back all the bucket list at page load
    bucketListFactory.showAll(function(data){
        // console.log('I bringing in all the bucketlist')
        $scope.allblist = data;
        // console.log('I bringing in all the bucketlist')
        // console.log(data);

            //adding a new bucketlist
            $scope.newList = function(user){
                // console.log(user)
                //other side of the not able to work with hiden value, set the newl.owner to user.name
                // $scope.newl.ownerl = user._id;
                // $scope.newl.buddyl = user._id;
                $scope.newl.ownerl = user.name;
                $scope.newl.done = false;
                // console.log($scope.newl);
                 bucketListFactory.newList($scope.newl, function(data){
                    // console.log('I am in dashboardController - newList calling factory - client');
                    // console.log('should called the showall')
                    $scope.allblist.push(data)
                    $location.url('/dashboard');
                 });
            };

            $scope.blistDone = function(blist){
                console.log('I am blist in controller', blist)
                bucketListFactory.blistDone(blist);
                $location.url('/dashboard');
        }
    })




//THIS is sample code for me for a full circle of 
    $scope.testCreate = function(){
        //this is the data read in from the dashboard partial, I called the ng-model test. ... 
        // console.log($scope.test)
        //when I call the factory I need to pass in the $scope.test to it to pass it to the server
        bucketListFactory.testCreate($scope.test, function(data){
            // console.log('I am in dashboardController - test create calling factory - client');
            $scope.test = data;
            $location.url('/dashboard')
        })
    }
//end of full circle

});
