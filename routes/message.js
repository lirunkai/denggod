var express = require('express');
var router = express.Router();
var User = require('../model/user.js');
var Info = require('../model/info.js');

router.get('/',function(req,res){
  User.find({},function(err,docs){
    if(err){
      console.log(err)
    } else {
      res.render('message',{docs:docs})
    }
  })
})

router.get('/:id',function(req,res){
  var openid = req.params.id;
  console.log(openid);
  Info.find({openid:openid},function(err, docs){
    if(err){
      console.log(err)
    } else {
      res.render('messagestate',{docs:docs})
    }
  })
})

router.get('/state/:shopnum',function(req,res){
  var shopNum = req.params.shopnum;
  Info.find({infoShopNum:shopNum},function(err,docs){
    if(err){
      console.log(err)
    }else{
      res.render('messageinfo',docs[0])
    }
  })
})

router.post('/state/:shopnum',function(req,res){
  var shopNum = req.params.shopnum;
  console.log(req.body)
  var infoState = req.body.infoState;
  var infoResult = req.body.infoResult;
  var infoReason = req.body.infoReason;
  Info.update({infoShopNum:shopNum},{infoState:infoState,infoResult:infoResult,infoReason:infoReason},function(err,docs){
    if(err){
      console.log(err)
    } else {
      res.redirect('/message')
    }
  })
})

module.exports = router;
