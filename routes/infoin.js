var express = require('express');
var router = express.Router();
var Info = require('../model/info.js')
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


router.get('/', function(req, res, next){
  if( req.session.openid ) {
    var count = new Date();
    var nowd = count.getFullYear()+''+(count.getMonth()+1)+''+count.getDate();
    var s = 'HW'+nowd+req.session.openid.slice(1,6);
    res.render('infoin',{"codeji":s})
  } else {
    return res.redirect('/')
  }

})

router.post('/', upload.array('infofile',3),function(req, res, next){
  var openid = req.session.openid;
  console.log(openid+'-----openid')
  var count = new Date();
  var infoShopNum = count.getTime();
  var infoCreateTime = count.getFullYear()+'-'+(count.getMonth()+1)+'-'+count.getDate();
  var infofile = [];
  for(var i =0; i<req.files.length; i++){
    infofile[i] = req.files[i].filename;
  }
  console.log(infofile)
  var info = new Info({
    openid:  openid,
    infotype: req.body.infotype,
    infoarea: req.body.infoarea,
    infoname: req.body.infoname,
    infocard: req.body.infocard,
    infocode: req.body.infocode,
    infoloan: req.body.infoloan,
    infofile: infofile,
    infoHomeType: req.body.infoHomeType,
    infoHomeNumber: req.body.infoHomeNumber,
    infoDiYa: req.body.infoDiYa,
    infoShopNum: infoShopNum,
    infoCreateTime: infoCreateTime,
    infoState: '进行中',
    infoReason: '正在处理',
    infoResult: '审核中'
  })
  console.log(req.body.infoarea)
  info.save(function(err){
    if(err){
      console.log('baocunshibai-----------'+err)
    } else {
      return res.redirect('/infoin/success')
    }
  })
})

router.get('/success', function (req, res, next) {
  Info.find({openid: req.session.openid},null,{sort:{infoShopNum:-1},limit:1},function(err,content){
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
