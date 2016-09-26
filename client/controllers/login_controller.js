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
