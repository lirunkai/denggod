var express = require('express');
var router = express.Router();
var User = require('../model/user')
var OAuth = require('wechat-oauth');

var client = new OAuth('wx60aeb0c0c8970d98','1fcf6b499cd23fc65bb881a410799afa');

router.get('/',function(req, res){
  var code = req.query.code;
  console.log('code-----'+code);
  client.getAccessToke(code,function(err, result){
    if( err ){
      console.log('err-------'+err);
      return res.redirect('/')
    } else {
    var openid = result.data.openid;
      console.log('openid----'+openid)
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
    }
    })
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
