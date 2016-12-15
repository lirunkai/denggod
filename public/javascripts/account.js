
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
