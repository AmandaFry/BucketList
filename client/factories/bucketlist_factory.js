myApp.factory('bucketListFactory', function($http){
    var factory = {};

    
    factory.showOne = function(user, callback){
        // console.log('am in in listFacory showOne')
        $http.get('/detail/'+user._id).success(function(data){
            factory.bucketList = data;
            callback();
        });
    };

    factory.showAll = function(callback){
        $http.get('/bucketlists/showAll').success(function(data){
            // console.log("client, factory, show all bucketlist")
            callback(data);
        });
    };

    factory.newList = function(newlData, callback){
        // console.log("I am inside newList factory");
        // console.log("Data passed on is", newlData);
        $http.post('/bucketlist/newList', newlData).success(function(fromServerdata){
            // console.log('data from server', fromServerdata);
            callback(fromServerdata);
        });
    };

    factory.blistDone = function(blist){
        console.log('in factory', blist);
        $http.post('/bucketlist/blistDone', blist)
    }

//This is sample full circle 
    factory.testCreate = function(testData, callback){
        //testData is what was passed from controller as $scope.test
        // console.log("I am inside test create factory, client");
        console.log('Data I am passing on,', testData);
        //this path has to match the server\config\
        $http.post('/bucketlist/testCreate', testData).success(function(fromServerdata){
            console.log('data from server', fromServerdata);
            callback(fromServerdata);
        });
    };
//end of full crcle
    return factory;
});