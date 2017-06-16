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
        $('body').on('touchstart',function(e) {
            var touch = e.originalEvent.targetTouches[0];
            var y = touch.pageY;
            console.log("touchstart" + y);
        });
        $('body').on('touchmove',function(e) {
            var touch = e.originalEvent.targetTouches[0];;
            var x = touch.pageX;
            var y = touch.pageY
            console.log("touchmove" + x);
        });
        $('body').on('touchend',function(e) {
            var touch = e.originalEvent.changedTouches[0];
            var y = touch.pageY;
            console.log("touchend" + y);
        });
        function getTransforms(translate3d){
            return {
                '-webkit-transform': translate3d,
                '-moz-transform': translate3d,
                '-ms-transform':translate3d,
                'transform': translate3d
            };
        }
        var sections = $('.section');
        var translate3d = 'translate3d(0, 0, 0)';
        var bootstrap = function(){

        }
        var shareTitle = $('#wxTitle').html();          //微信分享的标题
        var shareDesc = $('#wxDesc').html();            //微信分享的描述
        var shareLink = location.href;                  //微信分享的链接地址
        var shareImg = location.href.split('index.html')[0] + 'assets/fx.jpg';      //微信分享的图片地址
        var common = new Common();
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