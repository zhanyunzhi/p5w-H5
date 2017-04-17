/**
 * Created by zhanghua on 2017/4/17.
 */
var share_title = '���׹�ȥ��չ��δ���������²ĵ�2017�����ʣ�';
var share_desc = '2016�꣬Ӫҵ����11.32��Ԫ��ͬ������16%��Ӫҵ����9762��Ԫ��ͬ������61%��';
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

                    //���͸�����
                    shareFriend(share_title, share_desc, share_link);

                    //��������Ȧ
                    shareTimeline(share_title, share_desc, share_link);

                    //�����QQ����
                    shareQQ(share_title, share_desc, share_link);

                    //����΢��
                    shareWeibo(share_title, share_desc, share_link);
                });

            }
        }
    });
}