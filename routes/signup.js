var router = require('express').Router();

//注册页面
router.get('/', function (req, res, next) {
  res.send(req.flash)
  res.render('signup')
})

module.exports = router;
