var express = require('express');
var router = express.Router();
var User = require('../model/user')

router.get('/',function(req, res){
  var phone = req.session.phone;
  if( req.session.phone ){
    return res.redirect('/home')
  } else {
    // User.find({phone: phone},function(err, content){
    //   if( err ){
    //     req.flash('error', err)
    //     return res.redirect('/')
    //   } else {
    //     if ( content.length === 0 ) {
    //       req.session.phone = phone;
    //       res.render('index');
    //     } else {
    //       req.session.phone = phone;
    //       return res.redirect('/home');
    //     }
    //   }
    // })
    req.session.phone = null;
    res.render('index')
  }
})


router.post('/', function(req, res) {
  //将用户数据写入数据库
  console.log(req.body);
  var username = req.body.username;
  var phone = req.body.phone;
  //var phone = req.session.phone;
  var user = new User({
    username: username,
    phone: phone
  });
  User.find({phone:phone},function(err,content){
    if(err){
      console.log(err)
    }else{
      console.log(content.length)
      if ( content.length === 0){
        user.save();
        req.session.phone = phone;
        return res.redirect('/infoin');
      } else {
        return res.redirect('/callback')
      }
    }
  })
})


module.exports = router;
