var express = require('express');
var router = express.Router();
var Admin = require('../model/admin.js');

router.get('/',function(req,res){
  res.render('login')
})

router.post('/',function(req,res){
  var pass = req.body.pass;
  var username = req.body.username;
  Admin.find({username:username},function(err,docs){
    if(err){
      console.log('err-----'+err);
      return res.redirect('/')
    } else {
      if( docs.length === 0){
        return res.redirect('/login')
      } else {
        if (docs[0].pass === pass){
          req.session.username = username;
          return res.redirect('/message');
        } else {
          return res.redirect('/login')
        }
      }
    }
  })
})

module.exports = router;
