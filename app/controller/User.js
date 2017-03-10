var UserModel = require("./../models/User");
var jsonwebtoken = require('jsonwebtoken');

exports.getUser = function(req, res)
{
UserModel.find({}).populate("comments").exec(function(err, User)
{
   if(err){
    	res.json({code: 400, message: "Error occurred"});
    }else{

	res.json({code: 200, message: "records found",data:User});
      }
  })
}

exports.addUser = function(req, res)
{
  var User = new UserModel(req.body);
  User.save(function (err)
  {
    if (err)
    {
      res.json({code:400,message:"error"});

    }else{
      res.json({code:200,message:"created",data:User});

    }
  })
}
exports.getUserById = function(req, res)
{
var id=req.params.id;
UserModel.find({'_id':id}).populate("comments").exec(function(err, User)
{
   if(err){
    	res.json({code: 400, message: "Error occurred"});
    }else{

	res.json({code: 200, message: "records found",data:User});
      }

  })
}
  exports.updateUser = function(req, res)
{
    console.log("updateUser", req.params.id, req.body);
  //  BlogModel.findOneAndUpdate({_id: req.params.id}, { $set: req.body }, {new: true}, function(err, blog){

   UserModel.update({_id: req.params.id}, { $set: req.body }, function(err, User)
   {
      if(err)
      {
        res.json({code: 404, message: err});
      }else{
         res.json({code: 200, data:User });
        }
    })

}


  exports.removeUser = function(req, res)
    {
      console.log("removeUser", req.params.id, req.body);
      UserModel.remove({_id: req.params.id},function (err ,User)
      {
        if (err)
        {
          res.json({code:400,message:"error"});

        }else{
          res.json({code:200,message:"removed",data:User});

        }
      })
    }

  exports.regUser = function(req, res)
    {
      var User = new UserModel(req.body);
      User.save(function (err)
      {
        if (err)
        {
          res.json({code:400,message:"error"});

        }
        else{
          res.json({code:200,message:"created",data:User});

        }
      })
    }
  exports.logUser = function(req, res)
     {
      UserModel.findOne({email:req.body.email, password:req.body.password}).exec(function(err ,User)
       {
         if(err){
         console.log(error)
         res.json({code:400,message:"error"});
       }else if(User)
              {
              /* step-1 create token */
          var payload = {
           id : User._id
           };
           console.log(payload);
           var token = jsonwebtoken.sign(payload, 'shhhhh');
           console.log(token);
           res.json({
           code:200,
           message: 'Succesfully Logged in',
           data :{token: token }});
           }else{
               res.json({code:404,message:"email or passwod is wrong"});
            }
        });
    }
