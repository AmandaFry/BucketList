var mongoose = require('mongoose');
var BucketList = mongoose.model('bucketList');
var Test = mongoose.model('test');

console.log('I got to bucketListController - server loaded.');

module.exports = {

    showOne: function(req,res){
        bucketList.findOne({_id:req.params.id},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    testCreate: function(req,res){
    	//itn sent the informaiton in correctly I have both info
    	console.log(req.body)

    	var test = new Test(req.body)
    	console.log(test)
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



}