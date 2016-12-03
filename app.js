var koa = require('koa');
var app = koa();

app.use(function* (){
  this.body = 'hello 啊啊'
})

app.listen(3000)

console.log('listening 3000')
