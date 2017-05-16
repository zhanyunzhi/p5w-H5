/**
 * Created by user on 2017/4/10.
 */
//import tpl from './index.html';          //引入模板
import './index.scss';                   //引入sass文件
import './music.mp3';                   //引入mp3文件
import Common from '../../lib/js/common.js';                   //引入common文件
import '../../lib/js/swiper.min.js';                   //引入swiper文件
function index() {
    $(function(){
        var shareTitle = $('#wxTitle').html();          //微信分享的标题
        var shareDesc = $('#wxDesc').html();            //微信分享的描述
        var shareLink = location.href;                  //微信分享的链接地址
        var shareImg = location.href.split('index.html')[0] + 'assets/fx.jpg';      //微信分享的图片地址
        function init(){
            /*var eSwiper = $('.swiper-slide');
            console.log($('.swiper-container1').height())
            for(var i=0; i<eSwiper.length; i++){
                eSwiper.eq(i).css({height:'1.56rem'});
            }*/
        }
        var common = new Common();
        common.setWxShare(shareTitle, shareDesc, shareLink, shareImg);          //设置微信分享的内容
        common.setMusic();          //设置音乐播放和启动等
        common.loading(init);       //图片预加载，加载完成后再启动fullpage
        var swiper1 = new Swiper('.swiper-container1', {
            direction : 'vertical',
            slidesPerView: 5,
            centeredSlides: true,
            spaceBetween: 2,
            onSlideChangeEnd: function(swiper1){
                swiper1.slides[0].style.width='60%';//获取slide的HTML元素并修改样式
            }
        });
    });
    return {
        name: 'index',
        //tpl: tpl
    }
}

export default index;