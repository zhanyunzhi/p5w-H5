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
        var translate3d = 'translate3d(0, 0, 0)';
        var timer = null;           //定时器
        var hookPosX = 0;           // 当前X轴方向位置
        var hookPosY = 0;           // 当前Y轴方向位置
        var step = 2;               // 单位时间内通过的距离
        var timeSpeed = 10;        // 通过时间控制移动速度
        function getTransforms(translate3d){
            return {
                '-webkit-transform': translate3d,
                '-moz-transform': translate3d,
                '-ms-transform':translate3d,
                'transform': translate3d
            };
        }
        function moveX(elem, step){          //移动事件（elem:移动的元素，step:移动的速度和方向）
            hookPosX += step;
            translate3d = 'translate3d( ' + hookPosX + 'px, 0, 0)';
            elem.css(getTransforms(translate3d));
        }
        $('#left').on('click',function(e) {        //向左移动
            e.preventDefault();// 阻止浏览器默认事件，重要
            clearInterval(timer);
            timer = setInterval(function(){
                if(hookPosX < 0 || hookPosX >=200){            //移动到可以移动的最大位置后，停止
                    step = -step;
                }
                moveX($('#hook'),step);
                //console.log($('#hook').css('transform').match(/matrix\(\d+, \d+, \d+, \d+, (\d+), (\d+)\)/)[1])
            },timeSpeed);
        });
        /*$('#left').on('touchstart',function(e) {        //向左移动
            e.preventDefault();// 阻止浏览器默认事件，重要
            clearInterval(timer);
            timer = setInterval(function(){
                if(hookPosX <= 0){            //移动到可以移动的最大位置后，停止
                    clearInterval(timer);
                    return;
                }
                moveX($('#hook'),-step);
                //console.log($('#hook').css('transform').match(/matrix\(\d+, \d+, \d+, \d+, (\d+), (\d+)\)/)[1])
            },timeSpeed);
        });
        $('#left').on('touchend',function(e) {          //结束移动
            e.preventDefault();// 阻止浏览器默认事件，重要
            clearInterval(timer);
        });*/
        $('#right').on('touchstart',function(e) {       //向右移动
            e.preventDefault();// 阻止浏览器默认事件，重要
            clearInterval(timer);
            timer = setInterval(function(){
                if(hookPosX >= 200){          //移动到可以移动的最大位置后，停止
                    clearInterval(timer);
                    return;
                }
                moveX($('#hook'),step);
            },timeSpeed);
        });
        $('#right').on('touchend',function(e) {         //结束移动
            e.preventDefault();// 阻止浏览器默认事件，重要
            clearInterval(timer);
        });
        $('#sure').on('click',function(e) {         //确定
            clearInterval(timer);
            timer = setInterval(function(){
                if(hookPosY >= 200){
                    step = -step
                }
                hookPosY += step;
                translate3d = 'translate3d( ' + hookPosX + 'px,' + hookPosY + 'px, 0)';
                $('#hook').css(getTransforms(translate3d));
                if(hookPosY <= 0){
                    step = -step
                    clearInterval(timer);
                }
            },timeSpeed);
        });

        $('body').on('touchmove',function(e) {
            //e.preventDefault();// 阻止浏览器默认事件，重要
            var touch = e.originalEvent.targetTouches[0];
            var x = touch.pageX;
            var y = touch.pageY;
            console.log("touchmove" + x);
        });
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