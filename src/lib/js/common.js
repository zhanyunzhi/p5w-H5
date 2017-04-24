/**
 * Created by Tiny on 2017/4/17.
 */
function Common(){
    function shareFriend(shareTitle,descContent,lineLink,shareImg) {
        wx.onMenuShareAppMessage({
            title: shareTitle,
            desc: descContent,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }

    function shareTimeline(shareTitle,descContent,lineLink,shareImg) {
        wx.onMenuShareTimeline({
            title: shareTitle,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }

    function shareQQ(shareTitle,descContent,lineLink,shareImg){
        wx.onMenuShareQQ({
            title: shareTitle,
            desc: descContent,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    };

    function shareWeibo(shareTitle,descContent,lineLink,shareImg){
        wx.onMenuShareWeibo({
            title: shareTitle,
            desc: descContent,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    };
    function setWxShare(share_title, share_desc, share_link,share_img) {
        var url = location.href.split('#').toString();
        $.ajax({
            url: 'http://inews.p5w.net/wx/sign.php',
            type: 'post',
            dataType: 'json',
            data: {'url': url},
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (signPackage) {
                if (signPackage) {
                    var share_appid = signPackage.appId;
                    var share_nonceStr = signPackage.nonceStr;
                    var share_signature = signPackage.signature;
                    var share_timestamp = signPackage.timestamp;

                    wx.config({
                        debug: false,
                        appId: share_appid,
                        timestamp: share_timestamp,
                        nonceStr: share_nonceStr,
                        signature: share_signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
                    });

                    wx.ready(function () {

                        //发送给好友
                        shareFriend(share_title, share_desc, share_link, share_img);

                        //分享到朋友圈
                        shareTimeline(share_title, share_desc, share_link, share_img);

                        //分享给QQ好友
                        shareQQ(share_title, share_desc, share_link, share_img);

                        //分享到微博
                        shareWeibo(share_title, share_desc, share_link, share_img);
                    });

                }
            }
        });
    };
    function setMusic(){
        //点击暂停和启动音乐
        var music = document.getElementById("bgMusic");
        $("#audioBtn").click(function(){
            if(music.paused){music.play();
                $("#audioBtn").removeClass("pause").addClass("play");
            }else{music.pause();
                $("#audioBtn").removeClass("play").addClass("pause");
            }
        });
        //手动出发启动音乐
        document.getElementById('bgMusic').play();  //一般情况下，这样就可以自动播放了，但是一些奇葩iPhone机不可以
        document.addEventListener("WeixinJSBridgeReady", function () {  //必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
            document.getElementById('bgMusic').play();
            document.getElementById('video').play();
        }, false);
    }

    return {
        setWxShare: setWxShare,
        setMusic: setMusic
    };
}
export default Common;
