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
        console.log(docs.length)
        return res.redirect('/login')
      } else {
        console.log(docs)
        if (docs[0].pass === pass){
          console.log('pass-----'+pass);
          console.log('docspass------'+pass);
          return res.redirect('/message');
        } else {
          console.log('passerr-----'+pass);
          console.log('docspasserr------'+pass);
          return res.redirect('/login')
        }
      }
    }
  })
})

module.exports = router;
