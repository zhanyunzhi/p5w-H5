/**
 * Created by user on 2017/4/10.
 */
//import tpl from './index.html';          //引入模板
import './index.scss';                   //引入sass文件
import './music.mp3';                   //引入mp3文件
import Common from '../../lib/js/common.js';                   //引入common文件
//import '../../lib/js/swiper.min.js';                   //引入swiper文件
function index() {
    $(function(){
        var common = new Common();
        var translate3d = 'translate3d(0, 0, 0)';
        var sections = $(".section");
        var moves = null;
        var bootstrap = function(){
            var initPos = 0;        //初始化位置
            var changePos = 0;      //当前滑动移动的距离
            var nowPos = 0;         //现在所在的位置
            var touch = null;
            $('#zyz').on('touchstart',function(e) {       //向右移动
                touch = e.originalEvent.targetTouches[0];
                initPos = touch.pageX;
                console.log("initPos" + initPos);
            });
            $('#zyz').on('touchmove',function(e) {
                e.preventDefault();// 阻止浏览器默认事件，重要
                touch = e.originalEvent.targetTouches[0];
                changePos = touch.pageX - initPos;
                initPos = touch.pageX;
                for(var i=0;i<sections.length;i++){
                    moves = sections.eq(i).find('[qj-move]');
                    for(var j=0;j<moves.length;j++){
                        nowPos = (changePos * moves.eq(j).data("speed")) + parseInt((moves.eq(j).css('transform').split(',')[4] || 0));
                        translate3d = 'translate3d(' + nowPos + 'px, 0, 0)';
                        moves.eq(j).css(common.getTransforms(translate3d));
                    }
                }
                //console.log($('#tt').css('transform').split(',')[4] || 0)
                /*nowPos = changePos + parseInt(($('#tt').css('transform').split(',')[4] || 0));
                console.log("nowPos" + nowPos);
                console.log("changePos" + changePos);
                translate3d = 'translate3d(' + nowPos + 'px, 0, 0)';
                $('#tt').css(common.getTransforms(translate3d));*/
            });
        }
        var shareTitle = $('#wxTitle').html();          //微信分享的标题
        var shareDesc = $('#wxDesc').html();            //微信分享的描述
        var shareLink = location.href;                  //微信分享的链接地址
        var shareImg = location.href.split('index.html')[0] + 'assets/fx.jpg';      //微信分享的图片地址
        common.setWxShare(shareTitle, shareDesc, shareLink, shareImg);          //设置微信分享的内容
        common.setMusic();          //设置音乐播放和启动等
        common.loading(bootstrap);       //图片预加载，加载完成后再启动fullpage


    });
    return {
        name: 'index',
        //tpl: tpl
    }
}

export default index;