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

                        //���͸�����
                        shareFriend(share_title, share_desc, share_link, share_img);

                        //��������Ȧ
                        shareTimeline(share_title, share_desc, share_link, share_img);

                        //�����QQ����
                        shareQQ(share_title, share_desc, share_link, share_img);

                        //����΢��
                        shareWeibo(share_title, share_desc, share_link, share_img);
                    });

                }
            }
        });
    };
    function setMusic(){
        //�����ͣ����������
        var music = document.getElementById("bgMusic");
        $("#audioBtn").click(function(){
            if(music.paused){music.play();
                $("#audioBtn").removeClass("pause").addClass("play");
            }else{music.pause();
                $("#audioBtn").removeClass("play").addClass("pause");
            }
        });
        //�ֶ�������������
        document.getElementById('bgMusic').play();  //һ������£������Ϳ����Զ������ˣ�����һЩ����iPhone��������
        document.addEventListener("WeixinJSBridgeReady", function () {  //������΢��Weixin JSAPI��WeixinJSBridgeReady������Ч
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
