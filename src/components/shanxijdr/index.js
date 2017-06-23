/**
 * Created by user on 2017/4/10.
 */
//import tpl from './index.html';          //引入模板
import './index.scss';                   //引入sass文件
import './music.mp3';                   //引入mp3文件
import Common from '../../lib/js/common.js';                   //引入common文件
import '../../lib/js/swiper.min.js';                   //引入swiper文件
function index() {
    $(function() {
        function getTransforms(translate3d) {
            return {
                '-webkit-transform': translate3d,
                '-moz-transform': translate3d,
                '-ms-transform': translate3d,
                'transform': translate3d
            };
        }

        var sections = $('.section');
        var translate3d = 'translate3d(0, 0, 0)';
        var bootstrap = function(){
            var effects = sections.eq(0).find('[qj-effect]');
            for(var j=0;j<effects.length;j++){
                effects.eq(j).addClass(effects.eq(j).attr('qj-effect'));
            }
            $('#qj').fullpage({
                continuousVertical: true,
                scrollingSpeed:700,
                scrollOverflow: true,
                afterRender:function() {
                    //页面滚动条
                    var winH = $('.fp-section').last().height() * 0.7;

                    $('.qa ol').slimScroll({
                        allowPageScroll: true,
                        height: winH + 'px',
                        size: '10px',
                        alwaysVisible: true,
                        wheelStep: 30,
                    });
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
        }
        //点击空白处关闭弹窗
        var closeQR = function ($event) {
            var $tmp = $('.stop-close');
            if ($tmp.filter($event.target).length > 0 || $tmp.find($event.target).length > 0) {
                return false;
            }
            $('#shade').hide();           //隐藏弹窗
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

        $('#introduceOpen1,#introduceOpen2,#introduceOpen3').click(function(){
            showQR('#introduce');
        });
        $('#topMgrOpen1,#topMgrOpen2,#topMgrOpen3').click(function(){
            showQR('#topMgr');
        });
        $('#hotOpen1,#hotOpen2,#hotOpen3').click(function(){
            showQR('#hot');
        });
        $('#listOpen1,#listOpen2,#listOpen3').click(function(){
            showQR('#list');
        });
        $('#shade').click(function(){
            closeQR(event);
        });
        $('#openReport1,#openReport2,#openReport3').click(function(){
            location.href = './mlist.html';
        });
        /*var swiper1 = new Swiper('.swiper-container1', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            pagination: '.swiper-pagination',
            paginationClickable: true,
            paginationBulletRender: function (swiper, index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            }
        });*/
        var swiper2 = new Swiper('.swiper-container2', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            loop:true,
        });
        var swiper3 = new Swiper('.swiper-container3', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            loop:true,

        });
    });
    return {
        name: 'index',
        //tpl: tpl
    }
}

export default index;