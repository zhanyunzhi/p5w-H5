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
            $('#qj').fullpage({
                continuousVertical: true,
                scrollingSpeed:700,
                afterRender: function(){
                    var effects = sections.eq(0).find('[qj-effect]');
                    for(var j=0;j<effects.length;j++){
                        effects.eq(j).addClass(effects.eq(j).attr('qj-effect'));
                    }
                },
                onLeave: function(index, nextIndex, direction ){
                },
                afterLoad: function(anchorLink, index){     //anchorLink 是锚链接的名称，index 是序号，从1开始计算
                    if(index==1){
                        ($("#qj").css(getTransforms(translate3d)));     //循环回到第一页时强制定位页面到指定位置，不然在iphone下会有问题
                    }
                    var i= 0;
                    for(i;i<sections.length;i++){
                        var effects = sections.eq(i).find('[qj-effect]');
                        if(i===index-1){
                            for(var j=0;j<effects.length;j++){
                                effects.eq(j).addClass(effects.eq(j).attr('qj-effect'));
                            }
                        }else{
                            for(var j=0;j<effects.length;j++) {
                                effects.eq(j).removeClass(effects.eq(j).attr('qj-effect'));
                            }
                        }
                    }
                }
            });
        }
        var shareTitle = $('#wxTitle').html();          //微信分享的标题
        var shareDesc = $('#wxDesc').html();            //微信分享的描述
        var shareLink = location.href;                  //微信分享的链接地址
        var shareImg = location.href.split('index.html')[0] + 'assets/fx.jpg';      //微信分享的图片地址
        var common = new Common();
        common.setWxShare(shareTitle, shareDesc, shareLink, shareImg);          //设置微信分享的内容
        common.setMusic();          //设置音乐播放和启动等
        common.loading(bootstrap);       //图片预加载，加载完成后再启动fullpage

        var eAnimates = $('#introduce').find('[qj-effect]');
        //打开遮罩并显示指定的二维码图片
        var showQR = function(index){
            $('#shade').show();
            $('#introduce').hide();
            $('#topMgr').hide();
            $('#list').hide();
            $('#hot').hide();
            $(index).show();
            eAnimates = $(index).find('[qj-effect]');
            //唤起遮罩的时候，原来的那些图片全部加模糊滤镜
            var i= 0;
            for(i;i<sections.length;i++){
                var effects = sections.eq(i).find('[qj-effect]');
                for(var j=0;j<effects.length;j++){
                    effects.eq(j).addClass('filter-blur');
                }
            }
            //弹窗元素去除动画
            for(var j=0;j<eAnimates.length;j++){
                eAnimates.eq(j).removeClass(eAnimates.eq(j).attr('qj-effect'));
                eAnimates.eq(j).hide();
            }
            //指定的弹窗元素加动画
            for(var j=0;j<eAnimates.length;j++){
                eAnimates.eq(j).show();
                eAnimates.eq(j).addClass(eAnimates.eq(j).attr('qj-effect'));
            }
            swiper3.startAutoplay();
            swiper4.startAutoplay();
            swiper5.startAutoplay();
        }
        //点击空白处关闭弹窗
        var closeQR = function ($event) {
            var $tmp = $('.stop-close');
            if ($tmp.filter($event.target).length > 0 || $tmp.find($event.target).length > 0) {
                return false;
            }
            $('#shade').hide();           //隐藏弹窗
            swiper3.stopAutoplay();
            swiper4.stopAutoplay();
            swiper5.stopAutoplay();
            //关闭遮罩之后，移除原来的图片的模糊滤镜
            var i= 0;
            for(i;i<sections.length;i++){
                var effects = sections.eq(i).find('[qj-effect]');
                for(var j=0;j<effects.length;j++){
                    effects.eq(j).removeClass('filter-blur');
                }
            }
            //弹窗元素去除动画
            for(var j=0;j<eAnimates.length;j++){
                eAnimates.eq(j).removeClass(eAnimates.eq(j).attr('qj-effect'));
                eAnimates.eq(j).hide();
            }
        };

        $('#introduceOpen').click(function(){
            showQR('#introduce');
        });
        $('#topMgrOpen').click(function(){
            showQR('#topMgr');
        });
        $('#hotOpen1,#hotOpen2').click(function(){
            showQR('#hot');
        });
        $('#listOpen').click(function(){
            showQR('#list');
        });
        $('#shade').click(function(){
            closeQR(event);
        });
        $('#openReport').click(function(){
            location.href = 'http://www.p5w.net/zdhd/jtjdr/hebei2017/mlist.htm';
        });
        var swiper1 = new Swiper('.swiper-container1', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            pagination: '.swiper-pagination',
            paginationClickable: true,
            paginationBulletRender: function (swiper, index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            }
        });
        var swiper2 = new Swiper('.swiper-container2', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            loop:true,
        });
        var swiper3 = new Swiper('.swiper-container3', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            loop:true,
            autoplay : 2000,
            autoplayDisableOnInteraction : false,               //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
            effect : 'fade',
            slidesPerView : 1,
            centeredSlides: true,
            spaceBetween: 0
        });
        var swiper4 = new Swiper('.swiper-container4', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            loop:true,
            autoplay : 2000,
            autoplayDisableOnInteraction : false,               //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
            effect : 'fade',
            slidesPerView : 1,
            centeredSlides: true,
            spaceBetween: 0
        });
        var swiper5 = new Swiper('.swiper-container5', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            loop:true,
            autoplay : 2000,
            autoplayDisableOnInteraction : false,               //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
            effect : 'fade',
            slidesPerView : 1,
            centeredSlides: true,
            spaceBetween: 0
        });
        swiper3.stopAutoplay();
        swiper4.stopAutoplay();
        swiper5.stopAutoplay();
    });
    return {
        name: 'index',
        //tpl: tpl
    }
}

export default index;