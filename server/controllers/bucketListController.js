var mongoose = require('mongoose');
var BucketList = mongoose.model('bucketList');
var Test = mongoose.model('test');

console.log('I got to bucketListController - server loaded.');

module.exports = {

    showOne: function(req,res){
        BucketList.findOne({_id:req.params.id},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },


    showAll: function(req,res){
        console.log('before searching all bucketlist items')
        BucketList.find({}, function(err,data){
             if(err)
                 console.log(err);
             //if no error then brings back all the data in a json format and put it in data
             else
                 res.json(data); 
                console.log('inside find all')
                console.log(data)
            });
    },

    newListCreate: function(req, res){

    	console.log('what is in req.body',req.body) 
    	// console.log(' I got here, use srting if object don't work 6736262736263')
    	
    	var newlist = new BucketList(req.body)
    	console.log('what is added', newlist);
    	newlist.save(function(err){
    		if(err)
    			console.log(err)
    		else{
    			BucketList.findOne({}, function(err,data){
					if(err)
						console.log(err)
					else{
						res.json(data);
					}
				}).sort({_id: -1});

     		}
    	})
    },

//this is part of circle of life cicle
    testCreate: function(req,res){
    	//it sent the informaiton in correctly I have both info
    	// console.log(req.body)

    	var test = new Test(req.body)
    	// console.log(test)
    	test.save(function(err){
    		if(err)
    			console.log(err);
       		else{
       			Test.findOne({}, function(err,data){
					if(err)
						console.log(err)
					else{
						res.json(data);
					}
				}).sort({_id: -1});
		    }
    	})
    }
    //end of circel of life cicle



}