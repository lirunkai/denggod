var express = require('express');
var router = express.Router();
var Info = require('../model/info.js');
var User = require('../model/user.js');

router.get('/user/:id',function(req,res){
  var openid = req.params.id;
  User.remove({openid:openid},function(err,docs){
    return res.redirect('/message')
  })
})

router.get('/shopinfo/:id',function(req,res){})

module.exports = router;
