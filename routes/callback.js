var express = require('express');
var router = express.Router();
var User = require('../model/user')

router.get('/',function(req, res){
  var openid = req.session.openid;
  if( req.session.openid ){
    return res.redirect('/home')
  } else {
    User.find({openid: openid},function(err, content){
      if( err ){
        req.flash('error', err)
        return res.redirect('/')
      } else {
        if ( content.length === 0 ) {
          req.session.openid = openid;
          res.render('index');
        } else {
          req.session.openid = openid;
          return res.redirect('/home');
        }
      }
    })
    //req.session.phone = null;
    //res.render('index')
  }
})


router.post('/', function(req, res) {
  //将用户数据写入数据库
  console.log(req.body);
  var username = req.body.username;
  var phone = req.body.phone;
  var openid = req.session.openid;
  var user = new User({
    username: username,
    phone: phone,
    openid: openid
  });
  User.find({openid:openid},function(err,content){
    if(err){
      console.log(err)
    }else{
      console.log(content.length)
      if ( content.length === 0){
        user.save();
        req.session.openid = openid;
        return res.redirect('/infoin');
      } else {
        return res.redirect('/callback')
      }
    }
  })
})


module.exports = router;
