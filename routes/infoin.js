var express = require('express');
var router = express.Router();
var Info = require('../model/info.js')
var multer = require('multer')
var User = require('../model/user.js')
var API = require('wechat-api');
var api = new API('wx60aeb0c0c8970d98','1fcf6b499cd23fc65bb881a410799afa');


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
    User.find({openid:req.session.openid},function(err,docs){
      if(err){
        console.log(err);
        return res.redirect('/')
      } else {
        if(docs.length == 0){
          return res.redirect('/')
        } else {
          var s = 'HW'+req.session.openid.slice(6,14).toUpperCase();
          res.render('infoin',{"codeji":s})
        }
      }
    })
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
    infophone: req.body.infophone,
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
      var templateId = 'I17Ttmym1YiGqMvJV6GzEJNYJqn1MGvlp8CZN5WLYog'; //模板id
      var url = 'http://d.zhongpinhappy.cn/showinfo/'+infoShopNum;    //返回的url
      var data = {
        "first" : {
          "value": '申请贷款'
        },
        "keyword1": {
          "value":  req.body.infoname
        },
        "keyword2": {
          "value": req.body.infophone
        },
        "keyword3": {
          "value": req.body.loan
        },
        "keyword4": {
          "value": '无'
        },
        "keyword5": {
          "value": req.body.infotype
        },
        "remark": {
          "value": "点击查看详情"
        }
      }   //使用的参数
      api.sendTemplate('okWlWwQobsP5pN-1vSc5kxVJAyEU',templateId,url,data,function(err,result){
        if(err){
          console.log("err-------"+err)
        } else {
          console.log('success----'+result)
        }
      })
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
