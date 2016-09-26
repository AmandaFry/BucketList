myApp.factory('bucketListFactory', function($http){
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