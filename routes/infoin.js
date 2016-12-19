var express = require('express');
var router = express.Router();
var Info = require('../model/info.js')
var multer = require('multer')


router.get('/', function(req, res, next){
  res.render('infoin')
})

router.post('/', function(req, res, next){
  var openid = req.session.openid;
  console.log(openid+'-----openid')
  var count = new Date();
  var infoShopNum = count.getTime();
  var infoCreateTime = count.getFullYear()+'-'+(count.getMonth()+1)+'-'+count.getDate();
  var info = new Info({
    openid:  openid,
    infoname: req.body.infoname,
    infocard: req.body.infocard,
    infocode: req.body.infocode,
    infoloan: req.body.infoloan,
    infofile: req.files,
    infoHomeType: req.body.infoHomeType,
    infoHomeNumber: req.body.infoHomeNumber,
    infoDiYa: req.body.infoDiYa,
    infoShopNum: infoShopNum,
    infoCreateTime: infoCreateTime,
    infoState: '进行中',
    infoReason: '正在处理',
    infoResult: '审核中'
  })
  info.save(function(err){
    if(err){
      console.log('baocunshibai-----------'+err)
    } else {
      return res.redirect('/infoin/success')
    }
  })
})

router.get('/success', function (req, res, next) {
  Info.find({openid: req.session.openid},null,{sort:{infoCreateTime:-1},limit:1},function(err,content){
    if(err){
      req.flash('error',err)
      res.redirect('/home')
    } else {
      console.log(content)
      var infoShopNum = content[0].infoShopNum;
      console.log(infoShopNum+'-----infoShopNum')
      res.render('infosuccess',{infoShopNum: infoShopNum})
    }
  })
})

module.exports = router;
