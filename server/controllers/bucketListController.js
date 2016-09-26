var mongoose = require('mongoose');
var bucketList = mongoose.model('bucketList');
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


}