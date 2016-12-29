var express = require('express');
var router = express.Router();
var User = require('../model/user.js');
var Info = require('../model/info.js');
var API = require('wechat-api');
var api = new API('wx60aeb0c0c8970d98','1fcf6b499cd23fc65bb881a410799afa');



function getUser(req){
  var username = req.session.username;
  if( username === 'haoweijituan888@163.com' ) {
    return true;
  } else {
    return false;
  }
}

router.get('/',function(req,res){
  if( getUser(req) ) {
    User.find({},function(err,docs){
      if(err){
        console.log(err)
      } else {
        res.render('message',{docs:docs})
      }
    })
  } else {
    return res.redirect('/login')
  }
})

router.get('/search/show/:id',function(req,res){
  var search = decodeURI(req.params.id);
  Info.find({"$or":[{"infoname":search},{"infoarea":search}]},function(err,docs){
    if(err){
      console.log(err);
    } else {
      res.render('messagestate',{docs:docs})
    }
  })
})

router.get('/search/show',function(req,res){
  res.redirect('/message');
})

router.post('/search',function(req,res){
  var search = encodeURI(req.body.search);
  res.redirect('/message/search/show/'+search+'');
})




router.get('/:id',function(req,res){
  var openid = req.params.id;
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
  var infoname = req.body.infoname;
  var openid = req.body.openid;
  console.log(req.body)
  var infoState = req.body.infoState;
  var infoResult = req.body.infoResult;
  var infoReason = req.body.infoReason;
  Info.update({infoShopNum:shopNum},{infoState:infoState,infoResult:infoResult,infoReason:infoReason},function(err,docs){
    if(err){
      console.log(err)
    } else {
      var templateId = 'UDm0rsiapSNz6hQE471dKsRGWuPFtCDKO1TZgQhEKkA'; //模板id
      var url = 'http://d.zhongpinhappy.cn/showinfo/'+shopNum;    //返回的url
      var data = {
        "first" : {
          "value": shopNum
        },
        "keyword1": {
          "value":  infoname
        },
        "keyword2": {
          "value": infoResult
        },
        "remark": {
          "value": "点击查看详情"
        }
      }   //使用的参数
      api.sendTemplate(openid,templateId,url,data,function(err,result){
        if(err){
          console.log("err-------"+err)
        } else {
          console.log('success----'+result)
        }
      })
      res.redirect('/message')
    }
  })
})

module.exports = router;
