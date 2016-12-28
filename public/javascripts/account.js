
$(function(){
    var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
        $gallery = $("#gallery"), $galleryImg = $("#galleryImg"),
        $uploaderInput = $("#uploaderInput"),
        $uploaderFiles = $("#uploaderFiles")
        ;
    var APP_ID = '7p1tdVFPkhjIAYTXTg0iDbSL-gzGzoHsz';
    var APP_KEY = 'b4pRwB7Bc6JU4eWacLL0W6lY';
    // 初始化
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });
    $('.js-getCapture').click(function(){
      var userVal = $('.js-sign_username').val();
      var phoneVal = $('.js-sign_phone').val();
      if( userVal!=='' && phoneVal!==''){
        $('.js-sign_last').css('display','block');
        $('.js-sign_show').css('display','none');
      }
      $('.js-news').data('phone',phoneVal);
      $('.js-news').data('username',userVal);
    });
    function getCap (phone) {
      console.log(phone)
      AV.Cloud.requestSmsCode(''+phone).then(function (success) {
            console.log('发送')
          }, function (error) {
      });
    }
    var s = 61;
    var timer = null;
    var bool = true;
    var capBtn = $('.js-cap_btn');
    function countDown (phone) {
      if( bool ) {
        bool = false;
        clearInterval(timer);
        capBtn.attr('disabled',true);
        getCap(phone)
        function tick(){
          s--;
          capBtn.text(s);
          if( s < 0 ) {
            s = 61;
            capBtn.attr('disabled',false);
            bool = true;
            capBtn.text('获取验证码')
          }
        }
        tick();
        timer = setInterval(tick,1000)
      }
    }
    $('.js-cap_btn').click(function(){
      var phone = $('.js-news').data('phone');
      countDown(phone);
    })
    $('.js-sign_in').click(function(event){
      event.preventDefault();
      var phone = $('.js-news').data('phone');
      var cap = $('.js-capture').val();
      AV.Cloud.verifySmsCode(''+cap, ''+phone).then(function(){
           //验证成功
           console.log('success')
           $('.js-index').submit();
        }, function(err){
           //验证失败
           findAlert(err.error)
        });
    })

    function findAlert(text){
      $('.js-alert-news').text(text)
      $('.js-alert').css('display','block')
    }
    $uploaderInput.on("change", function(e){
        var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
        if (files.length > 3) {
          $('.js-alert-news').text('上传图片大于3张,请重新上传')
          $('.js-alert').css('display','block')
        } else {
          for (var i = 0, len = files.length; i < len; ++i) {
              var file = files[i];

              if (url) {
                  src = url.createObjectURL(file);
              } else {
                  src = e.target.result;
              }

              $uploaderFiles.append($(tmpl.replace('#url#', src)));
          }
        }
    });
    $uploaderFiles.on("click", "li", function(){
        $galleryImg.attr("style", this.getAttribute("style"));
        $gallery.css('display','block');
    });
    $gallery.on("click", function(){
        $gallery.css('display','none')
    });

    $('.js-alert-hide').click(function(){
      $('.js-alert').css('display','none')
    })
});

$(function(){
  function IdentityCodeValid(code) {
           var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
           var tip = "";
           var pass= true;

           if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
               tip = "身份证号格式错误";
               pass = false;
           }

          else if(!city[code.substr(0,2)]){
               tip = "地址编码错误";
               pass = false;
           }
           else{
               //18位身份证需要验证最后一位校验位
               if(code.length == 18){
                   code = code.split('');
                   //∑(ai×Wi)(mod 11)
                   //加权因子
                   var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                   //校验位
                   var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                   var sum = 0;
                   var ai = 0;
                   var wi = 0;
                   for (var i = 0; i < 17; i++)
                   {
                       ai = code[i];
                       wi = factor[i];
                       sum += ai * wi;
                   }
                   var last = parity[sum % 11];
                   if(parity[sum % 11] != code[17]){
                       tip = "校验位错误";
                       pass =false;
                   }
               }
           }
           if(!pass) alert(tip);
           return pass;
       }
  $('.js_now_change').click(function(){
    var c = $('#js_infocard').val();
    if(IdentityCodeValid(c)){
      $('.js_nowshow').addClass('hide');
      $('.js_nowhide').removeClass('hide');
    }
  })
})
