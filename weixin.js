'use strict'
exports.reply = function* (next) {
  var message = this.weixin

  if ( message.MsgType === 'event' ){ //  事件推送
    if ( message.Event === 'subscribe' ){
      if ( message.EventKey ){
        console.log('扫描二维码')
      }
      console.log('nidingyuele')
      this.body = '我爱你,小猪'
    }
    else if ( message.Event === 'unsubscribe'){
      console.log('无情取消关注')
      this.body = ''
    }
    else if ( message.Event === 'LOCATION') {
      this.body = '地址位置获取到了哦'
    }
    else if ( message.Event === 'CLICK' ) {
      this.body = '点击了菜单'
    }
    else if ( message.Event === 'SCAN') {
      this.body = '关注后扫描'
    }
    else if ( message.Event === 'VIEW' ) {
      this.body = '您点击了菜单中的链接'
    }
  }
  else if ( message.MsgType === 'text' ) {
    var content = message.Content
    var reply = "别说话,你都对,试着回复\n\"我和豆豆谁吃的多\",\n\"经历\"\n\"百年好合\""

    if ( content === '我和豆豆谁吃的多' ) {
      reply = "我和豆豆吃的都少,傻不傻"
    }
    else if ( content === "经历" ) {
      reply = [
        {
          title: "我和豆豆第一次旅行",
          description: "秦皇岛之旅",
          picurl: "http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%B5%B7%E8%B4%BC%E7%8E%8B&step_word=&hs=0&pn=8&spn=0&di=64673112600&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=4112742672%2C2229068254&os=927132282%2C3702691979&simid=0%2C0&adpicid=0&ln=1974&fr=&fmq=1480833629410_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=11&oriquery=&objurl=http%3A%2F%2Fi.dimg.cc%2Fbd%2Fda%2Fe1%2F6d%2F23%2Fd9%2Fb5%2Ff6%2F78%2F47%2F6c%2F2c%2Fa5%2Ff8%2F08%2Fe9.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F1tytp7t_z%26e3Bv54AzdH3Fv5gpjgp-890bmcml0d_z%26e3Bm8n90daa_z%26e3Bip4s&gsm=0&rpstart=0&rpnum=0",
          url: "www.baidu.com"
        },
        {
          title: "我和豆豆第二次旅行",
          description: "云南之旅",
          picurl: "http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%B5%B7%E8%B4%BC%E7%8E%8B&step_word=&hs=0&pn=8&spn=0&di=64673112600&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=4112742672%2C2229068254&os=927132282%2C3702691979&simid=0%2C0&adpicid=0&ln=1974&fr=&fmq=1480833629410_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=11&oriquery=&objurl=http%3A%2F%2Fi.dimg.cc%2Fbd%2Fda%2Fe1%2F6d%2F23%2Fd9%2Fb5%2Ff6%2F78%2F47%2F6c%2F2c%2Fa5%2Ff8%2F08%2Fe9.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F1tytp7t_z%26e3Bv54AzdH3Fv5gpjgp-890bmcml0d_z%26e3Bm8n90daa_z%26e3Bip4s&gsm=0&rpstart=0&rpnum=0",
          url: "www.baidu.com"
        }
      ]
    }
    else if ( content === "百年好合" ) {
      reply = [{
        title: "百年好合",
        description: "结婚",
        picurl: "http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%B5%B7%E8%B4%BC%E7%8E%8B&step_word=&hs=0&pn=8&spn=0&di=64673112600&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=4112742672%2C2229068254&os=927132282%2C3702691979&simid=0%2C0&adpicid=0&ln=1974&fr=&fmq=1480833629410_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=11&oriquery=&objurl=http%3A%2F%2Fi.dimg.cc%2Fbd%2Fda%2Fe1%2F6d%2F23%2Fd9%2Fb5%2Ff6%2F78%2F47%2F6c%2F2c%2Fa5%2Ff8%2F08%2Fe9.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F1tytp7t_z%26e3Bv54AzdH3Fv5gpjgp-890bmcml0d_z%26e3Bm8n90daa_z%26e3Bip4s&gsm=0&rpstart=0&rpnum=0",
        url: "www.baidu.com"
      }]
    }
    this.body = reply
  }

  yield next
}
