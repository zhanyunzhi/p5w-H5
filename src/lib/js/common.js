/**
 * Created by zhanghua on 2017/4/17.
 */
var share_title = '回首过去、展望未来，回天新材的2017更精彩！';
var share_desc = '2016年，营业收入11.32亿元，同比增长16%；营业利润9762万元，同比增长61%。';
var share_link = location.href;
var share_img = location.href.split('index.html')[0] + 'assets/fx.png';
function shareFriend(shareTitle,descContent,lineLink) {
    wx.onMenuShareAppMessage({
        title: shareTitle,
        desc: descContent,
        link: lineLink,
        imgUrl: share_img,
        trigger: function (res) {
            $('#mcover').hide();
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
}

function shareTimeline(shareTitle,descContent,lineLink) {
    wx.onMenuShareTimeline({
        title: shareTitle,
        link: lineLink,
        imgUrl: share_img,
        trigger: function (res) {
            $('#mcover').hide();
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
}

function shareQQ(shareTitle,descContent,lineLink){
    wx.onMenuShareQQ({
        title: shareTitle,
        desc: descContent,
        link: lineLink,
        imgUrl: share_img,
        trigger: function (res) {
            $('#mcover').hide();
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
};

function shareWeibo(shareTitle,descContent,lineLink){
    wx.onMenuShareWeibo({
        title: shareTitle,
        desc: descContent,
        link: lineLink,
        imgUrl: share_img,
        trigger: function (res) {
            $('#mcover').hide();
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
};
function setWxShare(share_title, share_desc, share_link) {
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
                    shareFriend(share_title, share_desc, share_link);

                    //分享到朋友圈
                    shareTimeline(share_title, share_desc, share_link);

                    //分享给QQ好友
                    shareQQ(share_title, share_desc, share_link);

                    //分享到微博
                    shareWeibo(share_title, share_desc, share_link);
                });

            }
        }
    });
}